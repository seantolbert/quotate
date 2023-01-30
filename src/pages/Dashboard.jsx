import LatestQuotes from "../components/LatestQuotes";
import Notifications from "../components/Notifications";

const Dashboard = () => {
  return (
    <div className="min-h-screen w-screen flex justify-start gap-5 px-5 pt-16">
      <LatestQuotes />
      <Notifications />
    </div>
  );
};
export default Dashboard;
