import LatestQuotes from "../components/LatestQuotes";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen flex flex-col gap-5 ">
      <div className="w-screen h-[50vh] flex flex-col items-center justify-center bg-gradient-to-b from-slate-600 to-slate-800">
        <p>
          A very wise quote is a spectacular waterfall! When you see it, you
          feel its power!
        </p>
      </div>
      <LatestQuotes />
    </div>
  );
};
export default Dashboard;
