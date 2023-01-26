import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Auth, db } from "../firebase/config";
import { AuthContext } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const fbLogin = async (email, password) => {
    setIsPending(false);
    setError(null);

    try {
      const res = await signInWithEmailAndPassword(Auth, email, password);

      const userRef = doc(db, "users", res.user.uid);

      await setDoc(userRef, { online: true });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setError(null);
        setIsPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err);
        setIsPending(false);
      }
    }

    setIsPending(false);
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { fbLogin, isPending, error };
};
