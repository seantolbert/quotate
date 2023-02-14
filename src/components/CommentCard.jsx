import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFirestore } from "../hooks/useFirestore";
import { Auth } from "../firebase/config";

const CommentCard = ({ com }) => {
  const { deleteDocument } = useFirestore("comments");

  return (
    <div className="flex flex-col w-full p-2 rounded-lg relative gap-2  border-b-2">
      <div className="flex justify-between items-center">
        <p className="w-full">{com.commentContent}</p>
      </div>
      <div className="flex gap-5 w-full justify-between items-center">
        <p className="text-slate-400 text-sm font-extrabold">
          {com.user.username}
        </p>
        <div className="h-0.5 w-full bg-slate-600" />
        <p className="text-xs whitespace-nowrap">{com.date}</p>
      </div>

      {/*  */}
      {/* conditional comment delete function */}
      {/*  */}

      {Auth.currentUser.uid === com.user.userId && (
        <button
          onClick={() => deleteDocument(com.id)}
          className="flex justify-center items-center absolute -top-3 right-0 rounded-full bg-rose-500 w-5 h-5"
        >
          <FontAwesomeIcon icon={faX} fontSize="10px" />
        </button>
      )}
    </div>
  );
};
export default CommentCard;
