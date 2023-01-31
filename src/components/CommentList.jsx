import { faStar, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCollection } from "../hooks/useCollection";
import { useFirestore } from "../hooks/useFirestore";
// import { comments } from "../data/comments";

const CommentList = () => {
  const { documents: comments } = useCollection("comments");
  const { deleteDocument } = useFirestore("comments");

    console.log(comments);

  //   console.log(comments[0].date)

  return (
    <div className="w-full h-full flex justify-center pl-5">
      <div
        id="book-scroller"
        className="flex flex-col gap-5 w-full h-full overflow-y-scroll pt-5"
      >
        {comments?.map((com, key) => (
          <div
            key={key}
            className="flex flex-col w-full p-2 rounded-lg bg-slate-500 relative gap-2"
          >
            <div className="flex justify-between items-center">
              <p className="w-full">{com.commentContent}</p>
            </div>
            <div className="flex gap-5 w-full justify-between items-center">
              <p className="text-slate-900 uppercase text-sm tracking-[5px] font-extrabold">
                {com.createdBy}
              </p>
              <div className="h-0.5 w-full bg-slate-600" />
              <p className="text-xs whitespace-nowrap"></p>
            </div>

            {/*  */}
            {/* conditional comment delete function */}
            {/*  */}

            <button className="flex justify-center items-center absolute -top-3 right-0 rounded-full bg-rose-500 w-5 h-5">
              <FontAwesomeIcon icon={faX} fontSize="10px" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CommentList;
