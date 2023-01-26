import { useContext, useEffect, useState } from "react";
import { Auth, db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";
import { setDoc, doc } from "firebase/firestore";

export const useLogout = () => {
  const { dispatch, user } = useContext(AuthContext);

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      const { uid } = user;

      const userRef = doc(db, "users", uid);

      await setDoc(userRef, { online: false });

      await signOut(Auth);

      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setIsPending(false);
        console.log(err);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
