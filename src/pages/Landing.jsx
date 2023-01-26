import { useState } from "react";
import Logo from "../assets/quotatev2logo_large.png";
import { LoginForm, SignupForm } from "../components";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-screen w-screen flex items-center">
      <div className="w-1/2 m-5">
        <img src={Logo} alt="yoyo" />
      </div>
      <div className="w-1/2">
        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <SignupForm setIsLogin={setIsLogin} />
        )}
      </div>
    </div>
  );
};
export default Landing;
