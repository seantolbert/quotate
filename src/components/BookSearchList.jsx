const BookSearchList = ({
  bookList,
  isSelected,
  setIsSelected,
  setBookTitle,
  setAuthors,
  setImageURL,
}) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-5">
      <div
        id="book-scroller"
        className=" w-full h-full rounded-3xl shadow-slate800Shadow flex flex-col p-5 overflow-y-scroll overflow-hidden"
      >
        {bookList.length > 0 ? (
          bookList.map((book, key) => (
            <button
              onClick={() => {
                setIsSelected(key);
                setBookTitle(book.volumeInfo.title);
                setAuthors(book.volumeInfo.authors);
                setImageURL(book.volumeInfo.imageLinks.smallThumbnail);
              }}
              className={`flex w-full mb-5 gap-2 p-2 rounded-lg ${
                isSelected === key && "shadow-slate800Shadow text-rose-400"
              }`}
              key={key}
            >
              <div className="w-1/3">
                <img
                  className="w-full rounded-md"
                  src={book.volumeInfo.imageLinks?.smallThumbnail}
                  alt="book image"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/3 items-start">
                <p className="text-xl font-bold text-left">
                  {book.volumeInfo.title}
                </p>
                <p className="text-sm">{book.volumeInfo.authors}</p>
              </div>
            </button>
          ))
        ) : (
          <p>search for the book you found the quote in</p>
        )}
      </div>
    </div>
  );
};
export default BookSearchList;
