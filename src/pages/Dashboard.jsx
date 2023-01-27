// import { useCollection } from "../hooks/useCollection";
// import { Link } from "react-router-dom";
// import { useFirestore } from "../hooks/useFirestore";
import LatestQuotes from "../components/LatestQuotes";

const Dashboard = () => {
  // const { deleteDocument, response } = useFirestore("quotes");

  return (
    <div className="min-h-screen w-full flex justify-start p-5">
      <LatestQuotes />
    </div>
  );
};
export default Dashboard;
