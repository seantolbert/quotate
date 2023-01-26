import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, username) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await createUserWithEmailAndPassword(Auth, email, password);

      if (!res) {
        throw new Error("Could not complete signup");
      }

      await updateProfile(res.user, { displayName: username });

      await setDoc(doc(db, "users", res.user.uid), {
        online: true,
        displayName: username,
      });

      dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
