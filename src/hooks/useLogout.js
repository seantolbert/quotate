import { useContext } from "react";
import { Auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = async () => {
    signOut(Auth)
      .then(() => {
        dispatch({ type: "LOGOUT" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { logout };
};
