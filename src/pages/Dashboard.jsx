import { useState, useRef } from "react";
import { Filter } from "../components";
import LatestQuotes from "../components/LatestQuotes";
import { useCollection } from "../hooks/useCollection";

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState("all");

  const { documents: quotes } = useCollection("quotes");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  return (
    <div className="min-h-screen w-screen flex flex-col gap-5 items-center ">
      <div className=" h-[50vh] px-10 flex items-center bg-gradient-to-b  from-slate-600 to-slate-800">
        <div className=" h-full text-7xl flex items-center font-serif">"</div>
        <p className="text-3xl font-bold font-mono px-2 text-center">
          A very wise quote is a spectacular waterfall! When you see it, you
          feel its power!
        </p>
        <div className=" h-full text-7xl flex items-center rotate-180 font-serif">
          "
        </div>
      </div>
      <Filter changeFilter={changeFilter} currentFilter={currentFilter} />
      <LatestQuotes currentFilter={currentFilter} />
    </div>
  );
};
export default Dashboard;
