import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import QuoteCard from "./QuoteCard";

const LatestQuotes = () => {
  const { documents: quotes } = useCollection("quotes");

  console.log(quotes);

  return (
    <div className="w-3/4 flex flex-wrap justify-start gap-5">
      {quotes &&
        quotes.map((quote, key) => <QuoteCard quote={quote} key={key} />)}
    </div>
  );
};
export default LatestQuotes;
