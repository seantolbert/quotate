// import { useCollection } from "../hooks/useCollection";
// import { Link } from "react-router-dom";
// import { useFirestore } from "../hooks/useFirestore";
import LatestQuotes from "../components/LatestQuotes";

const Dashboard = () => {
  // const { deleteDocument, response } = useFirestore("quotes");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LatestQuotes />
    </div>
  );
};
export default Dashboard;
