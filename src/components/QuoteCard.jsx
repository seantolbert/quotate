import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";
import { Auth } from "../firebase/config";

const QuoteCard = ({ quote, index }) => {
  const { quoteContent, book, createdBy, hearts, id } = quote;

  const user = Auth.currentUser;

  return (
    <div className="flex gap-5 p-5 aspect-auto rounded-3xl border w-fit h-fit relative">
      <Link
        to={user ? `/quotes/${quote.id}` : undefined}
        className="flex flex-col gap-5"
      >
        <p className="text-3xl">{quoteContent}</p>
        <div className="flex gap-3 items-center w-full justify-between">
          <button className="flex gap-3 items-center pr-10">
            <FontAwesomeIcon icon={faHeart} />
            {hearts}
          </button>
          <div className="flex flex-col gap-3 items-end">
            <p className="text-sm">- {book.author}</p>
            <p className="italic text-xs">{book.title}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default QuoteCard;
