import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Auth } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";

const QuotePage = () => {
  const { id } = useParams();
  const { error, document: quote } = useDocument("quotes", id);

  const { user } = useContext(AuthContext);

  // const [user, setUser] = useState(null);

  // const [isLiked, setIsLiked] = useState();
  // const { document: userDoc, docError } = useDocument(
  //   "users",
  //   // Auth.currentUser.uid
  // );

  // console.log(error);

  // console.log("doc" + " " + docError);

  // const [showInputs, setShowInputs] = useState(false);
  // const [newQuoteContent, setNewQuoteContent] = useState("");

  // const { updateDocument, response } = useFirestore("quotes");
  // const { updateDocument: updateUserDocument, response: userResponse } =
  //   useFirestore("users");

  // const handleUpdateQuote = async () => {
  //   await updateDocument(id, { quoteContent: newQuoteContent });
  //   if (!response.error) {
  //     console.log("successful update");
  //   }
  //   setShowInputs(false);
  // };

  // const handleUnlike = async () => {
  //   await updateDocument(id), { hearts: (quote.hearts -= 1) };
  //   await updateUserDocument(Auth.currentUser.uid, {
  //     favorites: user.favorites.filter((value) => value !== quote.id),
  //   });
  // };

  // const handleLike = async () => {
  //   await updateDocument(id, { hearts: (quote.hearts += 1) });
  //   await updateUserDocument(Auth.currentUser.uid, {
  //     favorites: [...user.favorites, quote.id],
  //   });
  // };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  console.log(quote.book.imgURL);

  return (
    <div className="h-screen  w-screen pt-16 flex flex-col justify-start">
      <div className="h-1/2   flex justify-center items-center p-5">
        <div className=" w-full h-full flex justify-center items-center relative">
          <p className="tracking-[10px] text-4xl">{quote.quoteContent}</p>
        </div>
      </div>
      <div className="h-1/2 flex">
        <div className="w-2/3 h-full flex justify-center items-center p-5">
          <div className=" w-full h-full flex p-5 shadow-slate800Shadow rounded-xl">
            <div className="max-w-1/2">
              <img
                src={quote.book.imageURL}
                alt="book cover art"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-5 justify-center items-start p-3">
              <p className="text-xl">{quote.book.title}</p>
              <p className="text-sm">{quote.book.author}</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center">
          <div className="h-full w-full flex flex-col justify-center items-center gap-7">
            <button className="w-2/3 p-3 shadow-slate800Shadow text-green-400 rounded-xl tracking-[10px] uppercase">
              create
            </button>
            <button className="w-2/3 p-3 shadow-slate800Shadow text-yellow-400 rounded-xl tracking-[10px] uppercase">
              update
            </button>
            <button className="w-2/3 p-3 shadow-slate800Shadow text-rose-400 rounded-xl tracking-[10px] uppercase">
              delete
            </button>
          </div>
        </div>
      </div>

      {/* <div>
        <p>{id}</p>
        <p>{quote.quoteContent}</p> */}
      {/* {showInputs && (
        <div className="flex gap-5">
          <input
            type="text"
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            placeholder="new quote"
          />
          <button onClick={handleUpdateQuote}>update</button>
        </div>
      )} */}
      {/* <p>{quote.createdBy.displayName}</p>
        <p>likes: {quote.hearts}</p> */}
      {/* <p>liked: {isLiked ? "true" : "false"}</p> */}
      {/* <div>
        {Auth.currentUser && (
          <button onClick={isLiked ? handleUnlike : handleLike}>like</button>
        )}
      </div> */}
      {/* {Auth.currentUser.uid === quote.createdBy.id && (
        <button onClick={() => setShowInputs(!showInputs)}>update</button>
      )} */}
      {/* <div>
          <img src={quote.book.imageURL} alt="book cover art" />
        </div>
      </div> */}
    </div>
  );
};
export default QuotePage;
