const QuotePreview = ({
  quoteContent,
  authors,
  bookTitle,
  setQuoteContent,
  handleCreateQuote,
}) => {
  return (
    <div className="w-full justify-center flex items-center relative h-[50vh]">
      <textarea
        onChange={(e) => setQuoteContent(e.target.value)}
        value={quoteContent}
        className="bg-transparent p-3 h-full w-full text-2xl mt-10"
        placeholder="write your quote here"
      />
      <div className="absolute right-0 bottom-0 p-5 flex flex-col gap-5 items-end">
        {authors ? <p>- {authors[0]}</p> : <p>- author</p>}
        {bookTitle ? <p>{bookTitle}</p> : <p>book title</p>}
      </div>
    </div>
  );
};
export default QuotePreview;
