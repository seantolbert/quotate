import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { Auth } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const fbLogin = (email, password) => {
    setError(null);
    signInWithEmailAndPassword(Auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        setError(err);
      });
  };

  return { fbLogin, error };
};
