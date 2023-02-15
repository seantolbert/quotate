import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBook,
  faPlus,
  faQuoteLeftAlt,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  const { logout, error } = useLogout();

  const { width } = useWindowDimensions();

  return (
    <div className="absolute w-screen">
      <nav className="w-full p-5 flex justify-between items-center">
        <Link to="/dashboard" className="uppercase tracking-[15px]">
          quotate
        </Link>

        <div className="flex gap-9 items-center">
          {user ? (
            <>
              <div className="border w-8 h-8 rounded-full flex justify-center items-center uppercase">
                {user.displayName[0]}
              </div>

              <Link to="/">
                <FontAwesomeIcon icon={faQuoteLeftAlt} />
              </Link>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
              <Link to="/create">
                <FontAwesomeIcon icon={faPlus} />
              </Link>
              <button
                onClick={logout}
                className="flex justify-center items-center"
              >
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </>
          ) : location.pathname === "/" ? (
            <Link to="/dashboard">Explore</Link>
          ) : (
            <Link to="/">Sign In</Link>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
