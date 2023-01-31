import {
  faExchange,
  faHeart,
  faToolbox,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CommentForm } from "../components/CommentForm";
import { AuthContext } from "../context/AuthContext";
import { Auth } from "../firebase/config";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";

const QuotePage = () => {
  const { id } = useParams();
  const { error, document: quote } = useDocument("quotes", id);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const { deleteDocument, updateDocument } = useFirestore("quotes");

  const handleDelete = async () => {
    await deleteDocument(quote.id);
    navigate("/dashboard");
  };

  const [newQuoteContent, setNewQuoteContent] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  // const [user, setUser] = useState(null);

  // const [isLiked, setIsLiked] = useState();
  // const { document: userDoc, docError } = useDocument(
  //   "users",
  //   // Auth.currentUser.uid
  // );

  // console.log(error);

  // console.log("doc" + " " + docError);

  // const [showInputs, setShowInputs] = useState(false);
  // const [newQuoteContent, setNewQuoteContent] = useState("");

  // const { updateDocument, response } = useFirestore("quotes");
  // const { updateDocument: updateUserDocument, response: userResponse } =
  //   useFirestore("users");

  // const handleUpdateQuote = async () => {
  //   await updateDocument(id, { quoteContent: newQuoteContent });
  //   if (!response.error) {
  //     console.log("successful update");
  //   }
  //   setShowInputs(false);
  // };

  // const handleUnlike = async () => {
  //   await updateDocument(id), { hearts: (quote.hearts -= 1) };
  //   await updateUserDocument(Auth.currentUser.uid, {
  //     favorites: user.favorites.filter((value) => value !== quote.id),
  //   });
  // };

  // const handleLike = async () => {
  //   await updateDocument(id, { hearts: (quote.hearts += 1) });
  //   await updateUserDocument(Auth.currentUser.uid, {
  //     favorites: [...user.favorites, quote.id],
  //   });
  // };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen pt-16 flex justify-start">
      <div className=" w-2/3">
        <div className=" h-1/2 w-full p-5">
          <div className="w-full h-full rounded-2xl shadow-slate800Shadow flex justify-center items-center ">
            <p className="tracking-[10px] text-3xl w-4/5">
              {quote.quoteContent}
            </p>
          </div>
        </div>
        <div className="h-1/2 w-full p-5">
          <div className="w-full h-full rounded-2xl shadow-slate800Shadow p-5 flex">
            {isUpdating ? (
              <>
                <textarea
                  name="newQuoteContent"
                  value={newQuoteContent}
                  onChange={(e) => setNewQuoteContent(e.target.value)}
                  className="w-2/3 h-full bg-slate-700 rounded-xl p-3"
                />
                <div className="w-1/3 h-full flex flex-col items-center justify-evenly">
                  <button className="p-5 bg-slate-600 rounded-xl w-4/5 text-sm uppercase tracking-[5px]">
                    submit
                  </button>
                  <button
                    onClick={() => setIsUpdating(false)}
                    className="p-5 bg-rose-400 rounded-xl w-4/5 text-sm uppercase tracking-[5px]"
                  >
                    cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <CommentForm />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="w-1/3 h-full">
        <div className="h-1/2 w-full p-5">
          <div className="flex justify-evenly items-center shadow-slate800Shadow w-full h-full rounded-2xl ">
            <div className="w-1/3">
              <img
                src={quote.book.imageURL}
                alt="book cover art"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-5 justify-center items-start">
              <p className="text-xl">{quote.book.title}</p>
              <p className="text-sm">{quote.book.author}</p>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full p-5">
          <div className="w-full h-full rounded-2xl shadow-slate800Shadow">
            <div className="h-full w-full flex flex-col justify-center items-center gap-7">
              <button className="w-2/3 p-3 shadow-slate800Shadow text-cyan-400 rounded-xl tracking-[10px] uppercase flex gap-5 items-center justify-center">
                <FontAwesomeIcon icon={faHeart} />
                like
              </button>
              <button
                onClick={() => setIsUpdating(true)}
                disabled={isUpdating}
                className={`w-2/3 p-3 ${
                  isUpdating
                    ? "shadow-slate800Inset text-slate-600"
                    : "shadow-slate800Shadow text-yellow-400"
                } text-yellow-400 rounded-xl tracking-[10px] uppercase flex gap-5 justify-center items-center`}
              >
                <FontAwesomeIcon icon={faExchange} />
                update
              </button>
              <button
                onClick={handleDelete}
                className="w-2/3 p-3 shadow-slate800Shadow text-rose-400 rounded-xl tracking-[10px] uppercase flex justify-center gap-5 items-center"
              >
                <FontAwesomeIcon icon={faTrash} />
                delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="h-1/2   flex justify-center items-center p-5">
        <div className=" w-full h-full flex justify-center items-center relative">
          <p className="tracking-[10px] text-4xl">{quote.quoteContent}</p>
        </div>
      </div>
      <div className="h-1/2 flex">
        <div className="w-2/3 h-full flex justify-center items-center p-5">
          <div className=" w-full h-full flex p-5 shadow-slate800Shadow rounded-xl">
            <div className="max-w-1/2">
              <img
                src={quote.book.imageURL}
                alt="book cover art"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col gap-5 justify-center items-start p-3">
              <p className="text-xl">{quote.book.title}</p>
              <p className="text-sm">{quote.book.author}</p>
              <p></p>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full flex justify-center items-center">
          <div className="h-full w-full flex flex-col justify-center items-center gap-7">
            <button className="w-2/3 p-3 shadow-slate800Shadow text-yellow-400 rounded-xl tracking-[10px] uppercase">
              update
            </button>
            <button
              onClick={handleDelete}
              className="w-2/3 p-3 shadow-slate800Shadow text-rose-400 rounded-xl tracking-[10px] uppercase"
            >
              delete
            </button>
          </div>
        </div>
      </div> */}

      {/* <div>
        <p>{id}</p>
        <p>{quote.quoteContent}</p> */}
      {/* {showInputs && (
        <div className="flex gap-5">
          <input
            type="text"
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            placeholder="new quote"
          />
          <button onClick={handleUpdateQuote}>update</button>
        </div>
      )} */}
      {/* <p>{quote.createdBy.displayName}</p>
        <p>likes: {quote.hearts}</p> */}
      {/* <p>liked: {isLiked ? "true" : "false"}</p> */}
      {/* <div>
        {Auth.currentUser && (
          <button onClick={isLiked ? handleUnlike : handleLike}>like</button>
        )}
      </div> */}
      {/* {Auth.currentUser.uid === quote.createdBy.id && (
        <button onClick={() => setShowInputs(!showInputs)}>update</button>
      )} */}
      {/* <div>
          <img src={quote.book.imageURL} alt="book cover art" />
        </div>
      </div> */}
    </div>
  );
};
export default QuotePage;
