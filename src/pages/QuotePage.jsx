import { updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Auth } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";

const QuotePage = () => {
  const { id } = useParams();
  const { error, document: quote } = useDocument("quotes", id);

  const [isLiked, setIsLiked] = useState();
  const { document: user } = useDocument("users", Auth.currentUser.uid);

  useEffect(() => {
    if (user) {
      setIsLiked(user.favorites.includes(quote.id));
    }
  }, [user]);

  const [showInputs, setShowInputs] = useState(false);
  const [newQuoteContent, setNewQuoteContent] = useState("");

  const { updateDocument, response } = useFirestore("quotes");
  const { updateDocument: updateUserDocument, response: userResponse } =
    useFirestore("users");

  const handleUpdateQuote = async () => {
    await updateDocument(id, { quoteContent: newQuoteContent });
    if (!response.error) {
      console.log("successful update");
    }
    setShowInputs(false);
  };

  const handleUnlike = async () => {
    await updateDocument(id), { hearts: (quote.hearts -= 1) };
    await updateUserDocument(Auth.currentUser.uid, {
      favorites: user.favorites.filter((value) => value !== quote.id),
    });
  };

  const handleLike = async () => {
    await updateDocument(id, { hearts: (quote.hearts += 1) });
    await updateUserDocument(Auth.currentUser.uid, {
      favorites: [...user.favorites, quote.id],
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      QuotePage
      <p>{id}</p>
      <p>{quote.quoteContent}</p>
      {showInputs && (
        <div className="flex gap-5">
          <input
            type="text"
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            placeholder="new quote"
          />
          <button onClick={handleUpdateQuote}>update</button>
        </div>
      )}
      <p>{quote.createdBy.displayName}</p>
      <p>likes: {quote.hearts}</p>
      <p>liked: {isLiked ? "true" : "false"}</p>
      <div>
        <button onClick={isLiked ? handleUnlike : handleLike}>like</button>
      </div>
      {Auth.currentUser.uid === quote.createdBy.id && (
        <button onClick={() => setShowInputs(!showInputs)}>update</button>
      )}
      <img src={quote.book.imageURL} alt="book cover art" />
    </div>
  );
};
export default QuotePage;
