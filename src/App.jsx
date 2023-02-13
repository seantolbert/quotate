import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Navbar, Footer } from "./components";
import Navbar2 from "./components/Navbar2";
import Sidebar from "./components/Sidebar";
import { AuthContext } from "./context/AuthContext";
import { useWindowDimensions } from "./hooks/useWindowDimensions";
import {
  Create,
  Dashboard,
  MyQuotesPage,
  Profile,
  // QuotePage,
  QuotePage2,
  Landing,
} from "./pages";

function App() {
  const { user, authIsReady } = useContext(AuthContext);

  const { width } = useWindowDimensions();

  return (
    <div className="text-white z-0">
      {authIsReady && (
        <BrowserRouter>
          {width < 600 ? <Navbar2 /> : <Navbar />}
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/dashboard" /> : <Landing />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quotes/:id" element={<QuotePage2 />} />
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
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
