import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fbLogin } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    fbLogin(email, password);
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


<Link to="/signup">Sign Up</Link>

    </div>
  );
};
export default Login;
