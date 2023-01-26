import { useState } from "react";
import { useParams } from "react-router-dom";
import { Auth } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";

const QuotePage = () => {
  const { id } = useParams();
  const { error, document: quote } = useDocument("quotes", id);
  const [showInputs, setShowInputs] = useState(false);
  const [newQuoteContent, setNewQuoteContent] = useState("");

  const { updateDocument, response } = useFirestore("quotes");

  const handleUpdateQuote = async () => {
    await updateDocument(id, { quoteContent: newQuoteContent });
    console.log("successful update");
    setShowInputs(false);
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
      {Auth.currentUser.uid === quote.createdBy.id && (
        <button onClick={() => setShowInputs(!showInputs)}>update</button>
      )}
    </div>
  );
};
export default QuotePage;
