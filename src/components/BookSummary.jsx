const BookSummary = ({ quote }) => {
  return (
    <div className="w-full flex gap-5">
      <div className="w-1/3">
        <img
          src={quote.book.imageURL}
          alt="book cover art"
          className="w-full rounded-xl"
        />
      </div>
      <div className="flex flex-col gap-3 justify-center">
        <p className="text-xl">{quote.book.title}</p>
        <p className="text-sm">{quote.book.author}</p>
      </div>
    </div>
  );
};
export default BookSummary;
