import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { AuthContext } from "./context/AuthContext";
import { Create, Dashboard, Login, MyQuotesPage, Signup } from "./pages";
import Profile from "./pages/Profile";
import QuotePage from "./pages/QuotePage";

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  return (
    <div className="text-red-400">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/quotes/:id" element={<QuotePage />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/myquotes"
              element={user ? <MyQuotesPage /> : <Navigate to="/login" />}
            />
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
