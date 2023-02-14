import {
  faBook,
  faHamburger,
  faPlus,
  faQuoteLeftAlt,
  faSignOut,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

const Navbar2 = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { logout } = useLogout();

  return (
    <div className="fixed left-0 bottom-0 z-[10] p-3 flex justify-between w-full">
      <button
        className="text-2xl p-3 bg-slate-900 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => setShowMenu(!showMenu)}
      >
        <FontAwesomeIcon icon={showMenu ? faX : faHamburger} />
      </button>
      {showMenu && (
        <div className="flex gap-5 items-center bg-slate-900 rounded-full w-3/5 justify-between px-5">
          <Link to="/" className="text-2xl">
            <FontAwesomeIcon icon={faBook} />
          </Link>
          <Link to="/myquotes">
            <FontAwesomeIcon icon={faQuoteLeftAlt} />
          </Link>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link to="/create">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default Navbar2;
