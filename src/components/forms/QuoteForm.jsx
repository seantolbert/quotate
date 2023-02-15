import { Link } from "react-router-dom";

const QuoteForm = ({
  handleCreateQuote,
  quoteContent,
  setQuoteContent,
  disable,
}) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="p-5 w-3/4 h-full">
        <textarea
          name="quoteContent"
          className="bg-slate-700 rounded-xl p-5 w-full h-full"
          value={quoteContent}
          onChange={(e) => setQuoteContent(e.target.value)}
          placeholder="what is the quote?"
        />
      </div>
      <div className="  w-1/4 h-full flex flex-col justify-evenly items-center">
        <button
          disabled={disable}
          onClick={handleCreateQuote}
          className="p-3 uppercase text-green-300 tracking-[10px] shadow-slate800Shadow w-4/5 rounded-2xl"
        >
          create
        </button>
        <Link
          to="/dashboard"
          className="p-3 uppercase text-rose-300 tracking-[10px] shadow-slate800Shadow w-4/5 rounded-2xl text-center"
        >
          cancel
        </Link>
      </div>
    </div>
  );
};
export default QuoteForm;
