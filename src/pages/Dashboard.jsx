import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

const Dashboard = () => {
  const { documents: quotes } = useCollection("quotes");

  const { deleteDocument, response } = useFirestore("quotes");

  return (
    <div>
      Dashboard
      <div>
        {quotes &&
          quotes.map((quote, key) => (
            <div className="flex gap-5" key={key}>
              <Link to={`/quotes/${quote.id}`} className="flex gap-5">
                <p>{quote.quoteContent}</p>
                <p>total likes {quote.hearts}</p>
                <p>{quote.book.author}</p>
                <p>{quote.book.title}</p>
                <p>{quote.user && quote.user}</p>
              </Link>
              <button onClick={() => deleteDocument(quote.id)}>delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Dashboard;
