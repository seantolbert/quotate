import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBook,
  faPlus,
  faQuoteLeftAlt,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const location = useLocation();

  const { logout, error } = useLogout();

  return (
    <div className="absolute w-screen">
      <nav className="w-full p-5 flex justify-between items-center">
        <Link to="/dashboard" className="uppercase tracking-[15px]">
          quotate
        </Link>

        <div className="flex gap-9 items-center">
          {user ? (
            <>
              <p>Welcome {user.displayName}</p>
              <Link to="/">
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
