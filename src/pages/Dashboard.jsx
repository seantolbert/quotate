import { useContext } from "react";
import { useCollection } from "../hooks/useCollection";
import { QuoteContext } from "../context/QuoteContext";
import { useNavigate } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config";

const Dashboard = () => {
  const { documents: quotes } = useCollection("quotes");
  const { dispatch } = useContext(QuoteContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const docRef = doc(db, "quotes", id);
    await deleteDoc(docRef);
  };

  const handleUpdateQuote = (quote) => {
    dispatch({ type: "UPDATE_QUOTE", payload: quote });
    navigate("/create");
  };

  return (
    <div>
      Dashboard
      <div>
        {quotes &&
          quotes.map((quote, key) => (
            <div className="flex gap-5" key={key}>
              <p>{quote.quoteContent}</p>
              <p>{quote.user && quote.user}</p>
              <button
                onClick={() => {
                  handleUpdateQuote(quote);
                }}
              >
                update
              </button>
              <button onClick={() => handleDelete(quote.id)}>delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
