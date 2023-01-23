import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { AuthContext } from "./context/AuthContext";
import { Create, Dashboard, Landing, Login, Signup } from "./pages";

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  // console.log(import.meta.env.VITE_FB_API_KEY);

  return (
    <div className="text-red-400">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Landing />} />
            <Route
              path="/create"
              element={user ? <Create /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
