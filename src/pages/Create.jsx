import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuoteContext } from "../context/QuoteContext";
import { db } from "../firebase/config";

const Create = () => {
  const navigate = useNavigate();

  const { updatingQuote, dispatch } = useContext(QuoteContext);

  // console.log(updatingQuote);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (updatingQuote) {
      const ref = doc(db, "quotes", updatingQuote.id);
      await updateDoc(ref, { content: newQuoteContent });
    }
    if (!updatingQuote) {
      const ref = collection(db, "quotes");
      await addDoc(ref, { content: quoteContent });
    }

    dispatch({ type: "UPDATE_COMPLETE" });

    navigate("/");
  };

  const [quoteContent, setQuoteContent] = useState("");
  const [newQuoteContent, setNewQuoteContent] = useState(
    updatingQuote ? updatingQuote.content : ""
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="content"
          name="content"
          value={updatingQuote ? newQuoteContent : quoteContent}
          onChange={(e) =>
            updatingQuote
              ? setNewQuoteContent(e.target.value)
              : setQuoteContent(e.target.value)
          }
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
};
export default Create;
