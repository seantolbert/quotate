const UpdateQuoteForm = ({
  newQuoteContent,
  setNewQuoteContent,
  handleUpdate,
  setIsUpdating,
}) => {
  return (
    <div className="w-full h-full flex">
      <textarea
        name="newQuoteContent"
        value={newQuoteContent}
        onChange={(e) => setNewQuoteContent(e.target.value)}
        className="w-2/3 h-full bg-slate-700 rounded-xl p-3"
      />
      <div className="w-1/3 h-full flex flex-col items-center justify-evenly">
        <button
          onClick={handleUpdate}
          className="p-5 bg-slate-600 rounded-xl w-4/5 text-sm uppercase tracking-[5px]"
        >
          submit
        </button>
        <button
          onClick={() => setIsUpdating(false)}
          className="p-5 bg-rose-400 rounded-xl w-4/5 text-sm uppercase tracking-[5px]"
        >
          cancel
        </button>
      </div>
    </div>
  );
};
export default UpdateQuoteForm;
