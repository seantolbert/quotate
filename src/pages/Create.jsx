import axios from "axios";
import { Timestamp } from "firebase/firestore";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookSearch,
  BookSearchList,
  QuoteForm,
  QuotePreview,
} from "../components";
import { AuthContext } from "../context/AuthContext";
import { useFirestore } from "../hooks/useFirestore";
import { useGetBooks } from "../hooks/useGetBooks";

const Create = () => {
  const [quoteContent, setQuoteContent] = useState("");
  const [formError, setFormError] = useState(null);
  const [bookTitle, setBookTitle] = useState("");
  const [authors, setAuthors] = useState([]);
  const [search, setSearch] = useState("");
  const [bookList, setBookList] = useState([]);
  const [isSelected, setIsSelected] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // const { bookList, fetchError } = useGetBooks(search);

  const navigate = useNavigate();

  const disable = bookTitle === "" || quoteContent === "";

  const { user } = useContext(AuthContext);

  const { addDocument, response } = useFirestore("quotes");

  const handleBookSelect = () => {};

  // console.log(bookList);

  const handleCreateQuote = async (e) => {
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
    <div className="w-screen  h-screen px-5 flex justify-center">
      <div className="flex w-full h-full ">
        <div className=" w-3/4 h-full flex flex-col">
          <div className=" h-2/3 w-full">
            <QuotePreview
              quoteContent={quoteContent}
              authors={authors}
              bookTitle={bookTitle}
            />
          </div>
          <div className=" h-1/3 w-full">
            <QuoteForm
              quoteContent={quoteContent}
              setQuoteContent={setQuoteContent}
              handleCreateQuote={handleCreateQuote}
              disable={disable}
            />
          </div>
        </div>
        <div className=" w-1/4 flex flex-col">
          <div className="h-1/5 w-full">
            <BookSearch
              handleBookSearch={handleBookSearch}
              search={search}
              setSearch={setSearch}
            />
          </div>
          <div className="h-4/5 w-full ">
            <BookSearchList
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              setBookTitle={setBookTitle}
              setAuthors={setAuthors}
              setImageURL={setImageURL}
              bookList={bookList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Create;
