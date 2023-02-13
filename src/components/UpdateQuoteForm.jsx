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
    <div className="w-full flex flex-col h-[30vh] justify-center">
      {isUpdating ? (
        <div className="w-full h-full border rounded-lg flex flex-col justify-between">
          <textarea
            type="text"
            name="newQuoteContent"
            value={newQuoteContent}
            onChange={(e) => setNewQuoteContent(e.target.value)}
            className="w-full bg-transparent text-3xl "
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
        <p ref={quoteRef} className="text-3xl">
          {quoteContent}
        </p>
      )}
    </div>
  );
};
export default UpdateQuoteForm;
