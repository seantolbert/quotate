import { Link } from "react-router-dom";
import { Auth } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";


const MyQuotesPage = () => {
  const { documents: quotes } = useCollection("quotes");

  return (
    <div>
      {quotes &&
        quotes
          .filter((quote) => quote.createdBy.id === Auth.currentUser.uid)
          .map((quote, key) => (
            <div className="flex gap-5" key={key}>
              <Link to={`/quotes/${quote.id}`} className="flex gap-5">
                <p>{quote.quoteContent}</p>
                <p>total likes {quote.hearts}</p>
                <p>{quote.book.author}</p>
                <p>{quote.book.title}</p>
                <p>{quote.user && quote.user}</p>
              </Link>
              <button onClick={() => deleteDocument(quote.id)}>delete</button>
              {/* <button onClick={() => handleLike(user, quote)}>like</button> */}
            </div>
          ))}
    </div>
  );
};
export default MyQuotesPage;
