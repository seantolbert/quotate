import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { logout, error } = useLogout();

  return (
    <div className="w-screen absolute top-0">
      <nav className="w-full p-1 flex justify-between">
        <Link to="/dashboard" className="uppercase tracking-[15px]">
          quotate
        </Link>

        <div className="flex gap-5">
          <Link to="/create">Add</Link>
          {user ? (
            <div className="flex gap-5">
              <Link to="/myquotes">My Quotes</Link>
              <Link to="/profile">
                username:
                {user.displayName}
              </Link>
              <p>{error}</p>
              <button onClick={logout}>sign out</button>
            </div>
          ) : (
            <Link to="/login">Log In</Link>
          )}
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
