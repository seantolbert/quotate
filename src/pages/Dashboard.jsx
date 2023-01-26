import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";
import { useHeart } from "../hooks/useHeart";
import { Auth } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";

const Dashboard = () => {
  const { documents: quotes } = useCollection("quotes");

  const { deleteDocument, response } = useFirestore("quotes");

  const { document: user } = useDocument("users", Auth.currentUser.uid);

  const { like } = useHeart();

  const handleLike = async (quote) => {
    like(quote);
    // console.log("successful like?");
  };

  return (
    <div>
      Dashboard
      <div>
        {quotes &&
          quotes.map((quote, key) => {
            console.log(quote);
            return (
              <div className="flex gap-5" key={key}>
                <Link to={`/quotes/${quote.id}`} className="flex gap-5">
                  <p>{quote.quoteContent}</p>
                  <p>total likes {quote.hearts}</p>
                  <p>{quote.book.author}</p>
                  <p>{quote.book.title}</p>
                  <p>{quote.user && quote.user}</p>
                </Link>
                <button onClick={() => deleteDocument(quote.id)}>delete</button>
                <button onClick={() => handleLike(user, quote)}>like</button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Dashboard;
