import { useRef } from "react";

const UpdateQuoteForm = ({
  newQuoteContent,
  setNewQuoteContent,
  handleUpdate,
  setIsUpdating,
  isUpdating,
  quoteContent,
}) => {
  const quoteRef = useRef();

  return (
    <div className="w-full flex flex-col h-[30vh] py-5">
      {isUpdating ? (
        <div className="w-full h-full rounded-lg flex flex-col justify-between">
          <textarea
            type="text"
            name="newQuoteContent"
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            className="w-full h-full bg-transparent text-3xl "
          />
          <div className="w-full flex justify-end gap-5 p-2">
            <button
              onClick={handleUpdate}
              className="text-yellow-400 uppercase tracking-[7px]"
            >
              update
            </button>
            <button
              onClick={() => setIsUpdating(false)}
              className="text-slate-400 uppercase tracking-[7px]"
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between my-5">
          <div className=" h-full text-7xl flex items-center font-serif">
            "
          </div>
          <p ref={quoteRef} className="text-3xl text-center">
            {quoteContent}
          </p>
          <div className=" h-full text-7xl flex items-center rotate-180 font-serif">
            "
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdateQuoteForm;
