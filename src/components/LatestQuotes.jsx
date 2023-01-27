import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import QuoteCard from "./QuoteCard";

const LatestQuotes = () => {
  const { documents: quotes } = useCollection("quotes");

  return (
    <div className="flex flex-wrap gap-10 w-4/5">
      {quotes &&
        quotes
        //   .filter((qoute, i) => i !== 0)
          .map((quote, key) => (
            <QuoteCard quote={quote} key={key} index={key} />
          ))}
    </div>
  );
};
export default LatestQuotes;
