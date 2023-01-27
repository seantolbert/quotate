import axios from "axios";
import { Timestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useFirestore } from "../hooks/useFirestore";

const Create = () => {
  const [quoteContent, setQuoteContent] = useState("");
  const [formError, setFormError] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [isSelected, setIsSelected] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();

  const disable = bookTitle === "" || quoteContent === "";

  const { user } = useContext(AuthContext);

  const { addDocument, response } = useFirestore("quotes");

  console.log(bookList);

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
    };

    const book = {
      title: bookTitle,
      author: authors[0],
      imageURL,
    };

    const quote = {
      quoteContent,
      date: Timestamp.fromDate(new Date()),
      createdBy,
      book,
      hearts: 0,
    };

    console.log(response);
    await addDocument(quote);

    if (!response.error) {
      console.log(quote);
      console.log(response.error);
      navigate("/");
    }
  };

  const key = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

  const APIKey = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${key}`;

  const handleBookSearch = () => {
    axios
      .get(APIKey)
      .then((res) => {
        setBookList(res.data.items);
      })
      .catch((err) => setError(err.response.data.error.message));
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center">
      {/*  */}
      {/* 1st Row */}
      {/*  */}

      <div className="w-4/5 flex justify-center items-center h-1/3 border ">
        {/*  */}
        {/* quote display section */}
        {/*  */}
        <p className="text-4xl">{quoteContent}</p>
      </div>

      {/*  */}
      {/* 2nd Row */}
      {/*  */}

      <div className="flex w-4/5 h-1/3 justify-between">
        {/*  */}
        {/* quoteContent form */}
        {/*  */}
        <div className="flex justify-start rounded-xl shadow-slate800Shadow p-3 w-2/3">
          <form onSubmit={handleQuoteSubmit} className="w-full flex">
            <textarea
              name="quoteContent"
              value={quoteContent}
              onChange={(e) => setQuoteContent(e.target.value)}
              className="p-2 bg-slate-900 w-full h-full"
            />

            <button type="submit" disabled={disable}>
              submit
            </button>
          </form>
        </div>
        {/*  */}
        {/* book search form */}
        {/*  */}
        <div className="border">
          <input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button onClick={handleBookSearch}>search</button>

          <p>{formError}</p>
        </div>
      </div>

      {/*  */}
      {/* third Row */}
      {/*  */}
      <div className="border w-4/5 h-1/3">
        {/*  */}
        {/* book search results section */}
        {/*  */}
        {bookList.length > 0 &&
          bookList.map((book, key) => (
            <button
              key={key}
              onClick={() => {
                setIsSelected(key);
                setAuthors(book.volumeInfo.authors);
                setBookTitle(book.volumeInfo.title);
                setImageURL(book.volumeInfo.imageLinks.smallThumbnail);
              }}
              className={
                isSelected === key ? "border border-yellow-300" : undefined
              }
            >
              <div>
                <p>{book.volumeInfo.title}</p>
                <div>{book.volumeInfo.authors}</div>
              </div>
            </button>
          ))}
      </div>
    </div>
  );
};
export default Create;
