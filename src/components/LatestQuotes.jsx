import { Auth } from "../firebase/config";
import { useCollection } from "../hooks/useCollection";
import QuoteCard from "./QuoteCard";

const LatestQuotes = ({ currentFilter }) => {
  const { documents: quotes } = useCollection("quotes");

  // add filters here
  const filteredQuotes = quotes
    ? quotes.filter((quote) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "mine":
            return quote.createdBy.id === Auth.currentUser.uid;
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="w-full md:w-4/5 flex flex-wrap justify-start gap-5 px-5">
      {quotes && filteredQuotes.length > 0 ? (
        filteredQuotes.map((quote, key) => (
          <QuoteCard quote={quote} key={key} />
        ))
      ) : (
        <p className="w-full text-center uppercase tracking-[8px]">
          no quotes here
        </p>
      )}
    </div>
  );
};
export default LatestQuotes;
