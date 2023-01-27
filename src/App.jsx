import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, Footer } from "./components";
import Sidebar from "./components/Sidebar";
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
    <div className="text-white z-0">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/dashboard" /> : <Landing />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/quotes/:id" element={<QuotePage />} />
              <Route
                path="/profile"
                element={user ? <Profile /> : <Navigate to="/" />}
              />
              <Route
                path="/myquotes"
                element={user ? <MyQuotesPage /> : <Navigate to="/" />}
              />
              <Route
                path="/create"
                element={user ? <Create /> : <Navigate to="/" />}
              />
            </Routes>
            {/* <Sidebar /> */}
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
