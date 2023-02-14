import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../firebase/config";
import { useFirestore } from "../../hooks/useFirestore";
import { useState } from "react";
import { useCollection } from "../../hooks/useCollection";

const CommentForm = ({ quote }) => {
  const { addDocument } = useFirestore("comments");

  const { documents: comments } = useCollection("comments");

  const today = new Date();

  const dtf = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(today);

  const [commentContent, setCommentContent] = useState("");
  const [formError, setFormError] = useState(null);

  const handleAddComment = async () => {
    const user = {
      username: Auth.currentUser.displayName,
      userId: Auth.currentUser.uid,
    };

    const comment = {
      commentContent,
      user,
      quote: quote.id,
      date: dtf,
    };

    await addDocument(comment);

    setCommentContent("");
  };

  const commentCount = () => {
    const arr = comments?.filter((comment) => comment.quote === quote.id);
    return arr?.length;
  };

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="flex gap-5 pb-5">
        <p className="text-slate-500 uppercase tracking-[10px]">comments</p>
        <p>{commentCount()}</p>
      </div>

      <div className="flex justify-between">
        <div className="bg-black text-white rounded-full border w-14 h-14 flex justify-center items-center text-2xl">
          S
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          className="bg-slate-500 rounded-xl w-4/5 p-3 text-xl"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
      </div>
      <div className="w-full flex justify-end">
        <button
          onClick={handleAddComment}
          className="uppercase text-xs tracking-[7px] pt-5 text-green-400"
        >
          add comment
        </button>
      </div>
      <div className="w-full h-0.5 rounded-full bg-slate-600 mt-5"></div>
    </div>
  );
};

export default CommentForm;
