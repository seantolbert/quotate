import { faCheckCircle, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Notifications = () => {
  return (
    <div className=" w-1/4 flex flex-col gap-5 border rounded-xl p-5">
      {/*  */}
      {/* notification examples */}
      {/*  */}

      <div className="w-full rounded-lg p-2 border flex items-center justify-start gap-2">
        <FontAwesomeIcon icon={faCheckCircle} />
        <p className="text-sm">Created a quote!</p>
        <div className="h-0.5 w-full bg-slate-700"></div>
        <div className="rotate-90">
          <p className="text-xs text-center">2:30 pm</p>
        </div>
      </div>
      <div className="w-full rounded-lg p-2 border flex items-center justify-start gap-2">
        <FontAwesomeIcon icon={faHeart} />
        <p className="text-sm">Liked a quote!</p>
        <div className="h-0.5 w-full bg-slate-700"></div>
        <div className="rotate-90">
          <p className="text-xs text-center">2:30 pm</p>
        </div>
      </div>
      <div className="w-full rounded-lg p-2 border flex items-center justify-start gap-2">
        <FontAwesomeIcon icon={faHeartBroken} />
        <p className="text-sm">Unliked a quote!</p>
        <div className="h-0.5 w-full bg-slate-700"></div>
        <div className="rotate-90">
          <p className="text-xs text-center">2:30 pm</p>
        </div>
      </div>
    </div>
  );
};
export default Notifications;
