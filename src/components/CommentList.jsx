import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import CommentCard from "./CommentCard";

// import { comments } from "../data/comments";

const CommentList = ({ quote }) => {
  const { documents: comments } = useCollection("comments");


  console.log(comments)
  console.log(quote.id)

  return (
    <div
      id="book-scroller"
      className="flex flex-col gap-5 w-full h-full overflow-y-scroll pt-5"
    >
      {comments?.length > 0 && (
        comments
          ?.filter((comment) => quote.id === comment.quote)
          .map((comment, key) => {
            return <CommentCard com={comment} key={key} />;
          })
      ) }
    </div>
  );
};
export default CommentList;
