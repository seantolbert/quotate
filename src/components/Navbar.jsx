import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { QuoteContext } from "../context/QuoteContext";
import { Auth } from "../firebase/config";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { dispatch } = useContext(QuoteContext);
  const { user } = useContext(AuthContext);

  const handleCreateNavigate = () => {
    dispatch({ type: "UPDATE_COMPLETE" });
    navigate("/create");
  };

  const { logout, error } = useLogout();

  return (
    <nav className="w-screen p-1 flex justify-between">
      <Link to="/" className="uppercase tracking-[15px]">
        quotate
      </Link>

      <div className="flex gap-5">
        <button onClick={handleCreateNavigate}>Add</button>
        {user ? (
          <div className="flex gap-5">
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
  );
};
export default Navbar;
