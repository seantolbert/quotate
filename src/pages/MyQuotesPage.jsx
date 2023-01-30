import { Link } from "react-router-dom";
import { QuoteCard } from "../components";
import { Auth } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";

const MyQuotesPage = () => {
  const { documents: quotes } = useCollection("quotes");

  return (
    <div className="min-h-screen w-screen pt-16 flex justify-center items-center">
      <div className="w-4/5 flex flex-wrap justify-start gap-5">
        {quotes &&
          quotes
            .filter((quote) => quote.createdBy.id === Auth.currentUser.uid)
            .map((quote, key) => <QuoteCard key={key} quote={quote} />)}
      </div>
    </div>
  );
};
export default MyQuotesPage;
