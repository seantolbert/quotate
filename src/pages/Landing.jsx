import { useState } from "react";
import Logo from "../assets/quotatev2logo_large.png";
import { LoginForm, SignupForm } from "../components";
import { useWindowDimensions } from "../hooks/useWindowDimensions";

const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { width } = useWindowDimensions();

  return (
    <div className="h-screen w-screen flex items-center justify-evenly">
      {width > 1100 && (
        <div className="w-1/2 m-5">
          <img src={Logo} alt="yoyo" />
        </div>
      )}
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} />
      ) : (
        <SignupForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};
export default Landing;
