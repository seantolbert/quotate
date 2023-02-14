import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const SignupForm = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const { signup, error, isPending } = useSignup();

  const { navigate } = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, username);
    navigate('/dashboard')
  };

  const disable = password !== confirm;

  return (
    <div className="h-screen w-full flex justify-evenly items-center flex-col">
      <div className="flex flex-col items-center justify-evenly w-full h-3/4 px-5 md:px-10 md:shadow-slate800Shadow rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-evenly h-full w-4/5 p-2"
        >
          <div>
            <p>Welcome to</p>
            <p className="text-3xl font-extrabold uppercase tracking-[10px]">
              Quotate
            </p>
            <p className="text-xs">Create your account or enter your details</p>
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
            type="username"
            name="username"
            value={username}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg p-2 text-slate-200 bg-slate-900 caret-pink-400"
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-2 text-slate-200 bg-slate-900 caret-pink-400"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="w-full rounded-lg p-2 text-slate-200 bg-slate-900 caret-pink-400"
          />
          <input
            type="confirm"
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="confirm password"
            className="w-full rounded-lg p-2 text-slate-200 bg-slate-900 caret-pink-400"
          />

          <button
            type="submit"
            disabled={disable}
            className="p-2 bg-slate-100 text-slate-700 rounded-lg w-full flex justify-center items-center font-extrabold text-lg"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="flex gap-5">
        <p>Already have an account?</p>
        <button onClick={() => setIsLogin(true)} className="underline">
          Log In
        </button>
      </div>

      {isPending && <p>Loading... </p>}

      {error && <p>{error}</p>}
    </div>
  );
};
export default SignupForm;
