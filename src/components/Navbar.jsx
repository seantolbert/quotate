import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  const { logout } = useLogout();

  return (
    <nav className="w-screen p-1 flex justify-between">
      <Link to="/" className="uppercase tracking-[15px]">quotate</Link>
      <div className="flex gap-5">
        {user && <Link to={user ? "/create" : "/login"}>Add</Link>}
        {user && <button onClick={logout}>sign out</button>}
      </div>
    </nav>
  );
};
export default Navbar;
