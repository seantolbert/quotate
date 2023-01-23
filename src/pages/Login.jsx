import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

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
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit"> log in </button>
      </form>
    </div>
  );
};
export default Login;
