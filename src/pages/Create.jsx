import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

  // console.log(bookList);

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
    <div className="w-screen  h-screen px-5 flex justify-center">
      <div className="flex w-full h-full ">
        <div className=" w-3/4 h-full flex flex-col">
          <div className=" h-2/3 w-full flex justify-center items-center">
            {quoteContent === "" ? (
              <p className="uppercase text-lg tracking-[10px] w-4/5 text-center">
                enter your quote content and see it displayed here
              </p>
            ) : (
              <p className="text-2xl tracking-[10px] text-center w-4/5">
                {quoteContent}
              </p>
            )}
          </div>
          <div className=" h-1/3 w-full flex justify-center items-center">
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
              <button className="p-3 uppercase text-green-300 tracking-[10px] shadow-slate800Shadow w-4/5 rounded-2xl">
                create
              </button>
              <button className="p-3 uppercase text-rose-300 tracking-[10px] shadow-slate800Shadow w-4/5 rounded-2xl">
                cancel
              </button>
            </div>
          </div>
        </div>
        <div className=" w-1/4 flex flex-col">
          <div className="h-1/5 w-full  flex justify-center items-center gap-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search for a book"
              className="p-3 bg-transparent shadow-slate800Shadow rounded-2xl"
            />
            <button
              type="submit"
              className="rounded-full w-12 h-12 shadow-slate800Shadow"
              onClick={handleBookSearch}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="h-4/5 w-full flex items-center justify-center p-5 ">
            <div
              id="book-scroller"
              className=" w-full h-full rounded-3xl shadow-slate800Shadow flex flex-col p-5 overflow-y-scroll overflow-hidden"
            >
              {bookList.length > 0 ? (
                bookList.map((book) => (
                  <div className="flex w-full mb-5 gap-2">
                    <div className="w-1/3">
                      <img
                        className="w-full"
                        src={book.volumeInfo.imageLinks.smallThumbnail}
                        alt="book image"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-2/3">
                      <p className="text-xl font-bold">
                        {book.volumeInfo.title}
                      </p>
                      <p className="text-sm">{book.volumeInfo.authors}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>search for the book you found the quote in</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="w-screen h-screen flex flex-col justify-start items-center">
    //   {/*  */}
    //   {/* 1st Row */}
    //   {/*  */}

    //   <div className="w-4/5 flex justify-center items-center h-1/3 border ">
    //     {/*  */}
    //     {/* quote display section */}
    //     {/*  */}
    //     <p className="text-4xl">{quoteContent}</p>
    //   </div>

    //   {/*  */}
    //   {/* 2nd Row */}
    //   {/*  */}

    //   <div className="flex w-4/5 h-1/3 justify-between">
    //     {/*  */}
    //     {/* quoteContent form */}
    //     {/*  */}
    //     <div className="flex justify-start rounded-xl shadow-slate800Shadow p-3 w-2/3">
    //       <form onSubmit={handleQuoteSubmit} className="w-full flex">
    //         <textarea
    //           name="quoteContent"
    //           value={quoteContent}
    //           onChange={(e) => setQuoteContent(e.target.value)}
    //           className="p-2 bg-slate-900 w-full h-full"
    //         />

    //         <button type="submit" disabled={disable}>
    //           submit
    //         </button>
    //       </form>
    //     </div>
    //     {/*  */}
    //     {/* book search form */}
    //     {/*  */}
    //     <div className="border">
    //       <input
    //         type="text"
    //         name="search"
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       />

    //       <button onClick={handleBookSearch}>search</button>

    //       <p>{formError}</p>
    //     </div>
    //   </div>

    //   {/*  */}
    //   {/* third Row */}
    //   {/*  */}
    //   <div className="border w-4/5 h-1/3">
    //     {/*  */}
    //     {/* book search results section */}
    //     {/*  */}
    //     {bookList.length > 0 &&
    //       bookList.map((book, key) => (
    //         <button
    //           key={key}
    //           onClick={() => {
    //             setIsSelected(key);
    //             setAuthors(book.volumeInfo.authors);
    //             setBookTitle(book.volumeInfo.title);
    //             setImageURL(book.volumeInfo.imageLinks.smallThumbnail);
    //           }}
    //           className={
    //             isSelected === key ? "border border-yellow-300" : undefined
    //           }
    //         >
    //           <div>
    //             <p>{book.volumeInfo.title}</p>
    //             <div>{book.volumeInfo.authors}</div>
    //           </div>
    //         </button>
    //       ))}
    //   </div>
    // </div>
  );
};
export default Create;
