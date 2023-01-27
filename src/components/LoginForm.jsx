import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

// import { Link } from "react-router-dom";
// import {
//   sendPasswordResetEmail,
//   GoogleAuthProvider,
//   signInWithPopup,
// } from "firebase/auth";
// import { Auth } from "../firebase/config";

const LoginForm = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  // const [passwordReset, setPasswordReset] = useState("");

  // const [showInput, setShowInput] = useState(false);

  const { fbLogin, isPending, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fbLogin(email, password);
  };

  const handleClick = () => {
    console.log("working");
  };
  // const handlePasswordReset = async (resetEmail) => {
  //   try {
  //     await sendPasswordResetEmail(Auth, resetEmail);
  //     console.log("password reset email sent");
  //   } catch (err) {
  //     console.log(err.message + " " + err.code);
  //   }
  // };

  return (
    <div className="w-full h-screen flex items-center justify-evenly flex-col">
      <div className="flex flex-col items-center justify-evenly w-4/5 h-3/4 p-10 shadow-slate800Shadow rounded-xl">
        {/* <button onClick={handleClick}>yoyo</button> */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-evenly h-full w-4/5 p-2"
        >
          <div>
            <p>Welcome to</p>
            <p className="text-3xl font-extrabold uppercase tracking-[10px]">
              Quotate
            </p>
            <p className="text-xs pt-3">
              Continue with Google or enter your details
            </p>
          </div>

          <button className="w-full p-2 rounded-lg bg-slate-500 flex items-center justify-center gap-3">
            <FontAwesomeIcon icon={faGoogle} />
            Log In with Google
          </button>

          <div className="w-full flex items-center justify-evenly">
            <div className="h-1 rounded-full bg-slate-300 w-1/3" />
            or
            <div className="h-1 rounded-full bg-slate-300 w-1/3" />
          </div>

          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-2 text-slate-200 bg-slate-900 caret-pink-400"
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg p-2 text-slate-200 bg-slate-900 caret-pink-400"
          />

          <p className="w-full text-right text-xs underline">forgot password</p>

          {/* {showInput && (
            <>
              <p>please enter the email address on your account?</p>
              <input
                type="email"
                placeholder="account email"
                onChange={(e) => setPasswordReset(e.target.value)}
                value={passwordReset}
              />
              <button onClick={() => handlePasswordReset(passwordReset)}>
                send
              </button>
            </>
          )} */}

          <button
            type="submit"
            className="p-2 bg-slate-100 text-slate-700 rounded-lg w-full flex justify-center items-center font-extrabold text-lg"
          >
            Log In
          </button>
        </form>
      </div>

      <div className="flex gap-5">
        <p>Don't have an account?</p>
        <button onClick={() => setIsLogin(false)} className="underline">
          Sign Up
        </button>
      </div>
    </div>
  );
};
export default LoginForm;
