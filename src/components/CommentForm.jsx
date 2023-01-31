import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CommentForm = ({
  setRating,
  rating,
  setCommentContent,
  commentContent,
}) => {
  return (
    <div className="w-full h-full">
      <p className="w-full tracking-[10px] uppercase h-1/5">Comments</p>
      <textarea
        name="newQuoteContent"
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-1/3 h-2/5 bg-slate-700 rounded-xl p-3"
        placeholder="comment"
      />
      <div className="flex justify-start items-center gap-3 h-1/5 w-1/3">
        <p className="uppercase tracking-[10px]">rating</p>
        <div className="flex gap-2">
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
          <FontAwesomeIcon icon={faStar} />
        </div>
      </div>
      <button className="h-1/5 w-1/3 bg-slate-600 uppercase tracking-[10px] rounded-xl">
        submit
      </button>
    </div>
  );
};
