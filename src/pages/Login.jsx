import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { Auth } from "../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [passwordReset, setPasswordReset] = useState("");

  const [showInput, setShowInput] = useState(false);

  const { fbLogin } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    fbLogin(email, password);
  };

  const handlePasswordReset = async (resetEmail) => {
    try {
      await sendPasswordResetEmail(Auth, resetEmail);
      console.log("password reset email sent");
    } catch (err) {
      console.log(err.message + " " + err.code);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>login</p>

        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit"> log in </button>
      </form>

      <div className="flex gap-5">
        <p>forgot password?</p>
        <button onClick={() => setShowInput(true)}>
          {" "}
          change password with email{" "}
        </button>
      </div>

      {showInput && (
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
      )}

      <Link to="/signup">Sign Up</Link>
    </div>
  );
};
export default Login;
