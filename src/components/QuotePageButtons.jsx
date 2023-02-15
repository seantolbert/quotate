import {
  faExchange,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuotePageButtons = ({ handleSwitch, handleDelete }) => {
  return (
    <div className="w-full flex md:max-w-1/3 md:flex-auto justify-evenly">
      <button className="font-bold text-cyan-300 flex justify-center items-center gap-2 py-3 w-1/4 uppercase">
        <FontAwesomeIcon icon={faHeart} />
        like
      </button>
      <button
        className="font-bold text-yellow-300 flex justify-center items-center gap-2 p-3 w-1/4 uppercase"
        onClick={handleSwitch}
      >
        <FontAwesomeIcon icon={faExchange} />
        update
      </button>
      <button
        className="font-bold text-rose-300 flex justify-center items-center gap-2 p-3 w-1/4 uppercase"
        onClick={handleDelete}
      >
        <FontAwesomeIcon icon={faTrash} />
        delete
      </button>
    </div>
  );
};
export default QuotePageButtons;
