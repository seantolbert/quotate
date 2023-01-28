const QuotePreview = ({ quoteContent, authors, bookTitle }) => {
  return (
    <div className="w-full h-full justify-center flex items-center relative">
      {quoteContent === "" ? (
        <p className="uppercase text-lg tracking-[10px] w-4/5 text-center">
          enter your quote content and see it displayed here
        </p>
      ) : (
        <p className="text-4xl tracking-[10px] text-center w-4/5">
          {quoteContent}
        </p>
      )}
      <div className="absolute p-10 right-0 bottom-0">
        <p className="text-lg font-bold">
          - {authors.length > 0 ? authors[0] : "author"}
        </p>
        <p className="text-sm italic text-right">
          {bookTitle ? bookTitle : "book title"}
        </p>
      </div>
    </div>
  );
};
export default QuotePreview;
