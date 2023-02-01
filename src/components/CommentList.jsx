import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
import CommentCard from "./CommentCard";

const CommentList = ({ quoteId }) => {
  const { documents: comments } = useCollection("comments");

  console.log(comments?.length)
  return (
    <div className="w-full h-full flex justify-center pl-5">
      <div
        id="book-scroller"
        className="flex flex-col gap-5 w-full h-full overflow-y-scroll pt-5"
      >

        {comments?.length > 0 ? (
          comments
            ?.filter((comment) => quoteId === comment.quote)
            .map((comment, key) => {
              return <CommentCard com={comment} key={key} />;
            })
        ) : (
          <div className="">no comments yet</div>
        )}
      </div>
    </div>
  );
};
export default CommentList;
