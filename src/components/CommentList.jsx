import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import CommentCard from "./CommentCard";

// import { comments } from "../data/comments";

const CommentList = ({ quote }) => {
  const { documents: comments } = useCollection("comments");

  const quoteComments = comments?.filter(
    (comment) => quote.id === comment.quote
  );

  return (
    <div
      id="book-scroller"
      className="flex flex-col gap-5 w-full h-full pt-5 overflow-y-scroll"
    >
      {quoteComments?.length > 0 ? (
        quoteComments.map((comment, key) => {
          return <CommentCard com={comment} key={key} />;
        })
      ) : (
        <p
          className={`w-full text-center text-slate-400 uppercase tracking-[7px]`}
        >
          no comments yet
        </p>
      )}
    </div>
  );
};
export default CommentList;
