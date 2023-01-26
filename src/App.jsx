import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { AuthContext } from "./context/AuthContext";
import {
  Create,
  Dashboard,
  MyQuotesPage,
  Profile,
  QuotePage,
  Landing,
} from "./pages";

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  return (
    <div className="text-white">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
