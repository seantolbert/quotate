import {
  faExchange,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateQuoteForm, CommentList, CommentForm } from "../components";
import { useDocument } from "../hooks/useDocument";
import { useFirestore } from "../hooks/useFirestore";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const QuotePage = () => {
  // const {width} = useWindowDimensions()

  const { id } = useParams();
  const { error, document: quote } = useDocument("quotes", id);

  const navigate = useNavigate();

  const { deleteDocument, updateDocument } = useFirestore("quotes");

  const handleDelete = async () => {
    await deleteDocument(quote.id);
    navigate("/dashboard");
  };

  const [newQuoteContent, setNewQuoteContent] = useState("");

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSwitch = () => {
    setNewQuoteContent(quote.quoteContent);
    setIsUpdating(true);
  };

  const handleUpdate = async () => {
    await updateDocument(quote.id, { quoteContent: newQuoteContent });
    setIsUpdating(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!quote) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-screen pt-16 flex flex-col md:flex-row justify-start">
      <div className="w-full md:w-2/3">
      <div className=" h-1/2 w-full p-5">
          <div className="w-full h-full rounded-2xl shadow-slate800Shadow flex justify-center items-center ">
            <p className="lg:tracking-[10px] md:tracking-[5px] text-xl lg:text-3xl w-4/5">
              {quote.quoteContent}
            </p>
          </div>
        </div>
        <div className="h-1/2 w-full p-5">
          <div className="w-full h-full rounded-2xl shadow-slate800Shadow p-5 flex">
            {isUpdating ? (
              <UpdateQuoteForm
                handleUpdate={handleUpdate}
                setIsUpdating={setIsUpdating}
                setNewQuoteContent={setNewQuoteContent}
                newQuoteContent={newQuoteContent}
              />
            ) : (
              <div className="flex w-full h-full">
                <div className="w-1/3 h-full">
                  <CommentForm quoteId={id} />
                </div>
                <div className="w-2/3 h-full">
                  <CommentList quoteId={id} />
                </div>
              </div>
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
                onClick={handleSwitch}
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
    </div>
  );
};
export default QuotePage;
