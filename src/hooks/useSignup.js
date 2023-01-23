import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const signup = (email, password) => {
    setError(null);
    createUserWithEmailAndPassword(Auth, email, password)
      .then((res) => {
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .catch((err) => {
        setError(err);
      });
  };

  return { error, signup };
};
