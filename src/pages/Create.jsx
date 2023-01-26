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

  const navigate = useNavigate();

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

    const quote = {
      quoteContent,
      date: Timestamp.fromDate(new Date()),
      bookTitle,
      authors,
      createdBy,
      hearts: 0,
    };

    await addDocument(quote);

    if (!response.error) {
      console.log(response.error);
      navigate("/");
    }
    console.log("created " + quote.quoteContent);
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
    <div>
      <form onSubmit={handleQuoteSubmit}>
        <input
          type="content"
          name="content"
          value={quoteContent}
          onChange={(e) => setQuoteContent(e.target.value)}
        />

        <button type="submit">submit</button>
      </form>

      <div>
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleBookSearch}>search</button>
      </div>

      <div>
        {bookList.map((book, key) => (
          <p key={key}>{book.volumeInfo.title}</p>
        ))}
      </div>
    </div>
  );
};
export default Create;
