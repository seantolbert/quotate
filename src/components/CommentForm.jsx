import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Auth } from "../firebase/config";
import { useFirestore } from "../hooks/useFirestore";
import { useState } from "react";

export const CommentForm = ({ id }) => {
  const { addDocument } = useFirestore("comments");

  const [commentContent, setCommentContent] = useState("");
  const [formError, setFormError] = useState(null);

  const navigate = useNavigate();

  const handleAddComment = async () => {
    const user = {
      username: Auth.currentUser.displayName,
      userId: Auth.currentUser.uid,
    };

    const comment = {
      commentContent,
      user,
      quote: id,
      date: Timestamp.fromDate(new Date()),
    };

    await addDocument(comment);
    setCommentContent("");
  };

  return (
    <div className="w-full h-full">
      <p className="w-full tracking-[10px] uppercase h-1/5">Comments</p>
      <textarea
        name="newQuoteContent"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="h-3/5 w-full bg-slate-700 rounded-xl p-3"
        placeholder="comment"
      />

      <button
        onClick={handleAddComment}
        className="h-1/5 bg-slate-600 uppercase text-xs tracking-[10px] rounded-xl w-full flex justify-center items-center"
      >
        add comment
      </button>
    </div>
  );
};
