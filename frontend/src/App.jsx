import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import AuthPage from "./AuthPage";
import ChatsPage from "./ChatsPage";
import RegisterPage from "./RegisterPage";

function App() {
  const [user, setUser] = useState(undefined);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <ChatsPage user={user} />
            ) : (
              <AuthPage onAuth={(user) => setUser(user)} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <ChatsPage user={user} />
            ) : (
              <RegisterPage onAuth={(user) => setUser(user)} />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
