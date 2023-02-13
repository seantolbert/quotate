const BookSearchList = ({
  bookList,
  isSelected,
  setIsSelected,
  setBookTitle,
  setAuthors,
  setImageURL,
}) => {
  return (
    <div className="h-[30vh] w-full flex items-center justify-center">
      <div
        id="book-scroller"
        className=" w-full h-full rounded-3xl flex p-5 items-center overflow-x-scroll"
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
                isSelected === key && "text-rose-400"
              }`}
              key={key}
            >
              <div className="w-[25vw]">
                <img
                  className="w-full rounded-md"
                  src={book.volumeInfo.imageLinks?.smallThumbnail}
                  alt="book image"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/3 items-start h-full">
                <p className=" font-bold text-left">
                  {book.volumeInfo.title}
                </p>
                <p className="text-xs">{book.volumeInfo.authors}</p>
              </div>
            </button>
          ))
        ) : (
          <p className="w-4/5">search for the book you found the quote in</p>
        )}
      </div>
    </div>
  );
};
export default BookSearchList;
