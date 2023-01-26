import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const SignupForm = ({setIsLogin}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const { signup, error, isPending } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, username);
  };

  const disable = password !== confirm;

  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <form onSubmit={handleSubmit}>
        <p>sign up</p>
        <input
          type="username"
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <input
          type="confirm"
          name="confirm"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="confirm password"
        />

        <button type="submit" disabled={disable}>
          sign up
        </button>
      </form>

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
