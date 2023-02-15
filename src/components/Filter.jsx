const Filter = ({ currentFilter, changeFilter }) => {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="flex w-full justify-center gap-9 items-center ">
      <button
        className={`capitalize p-2 rounded-xl text-slate-200 text-2xl ${
          currentFilter === "all" && "underline underline-offset-8"
        }`}
        onClick={() => handleClick("all")}
      >
        all
      </button>
      <button
        className={`capitalize p-2 rounded-xl text-slate-200 text-2xl ${
          currentFilter === "mine" && "underline underline-offset-8"
        }`}
        onClick={() => handleClick("mine")}
      >
        my quotes
      </button>
    </div>
  );
};
export default Filter;
