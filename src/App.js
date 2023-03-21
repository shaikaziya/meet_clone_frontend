import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import SignupPage from "./components/SignupPage/SignupPage";
import HomePage from "./components/HomePage/HomePage";
import CallPage from "./components/CallPage/CallPage";
import NoMatch from "./components/NoMatch/NoMatch";
import ForgotPasswordPage from "./components/ForgotPasswordPage/ForgotPasswordPage";
import { Toaster } from 'react-hot-toast';
import ResetPasswordPage from "./components/ResetPassword/ResetPassword";
import ProfilePage from "./components/ProfilePage/ProfilePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/sign-up" element={<SignupPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route exact path="/reset-password/:id/:token" element={<ResetPasswordPage />} />
        <Route exact path="/:roomId" element={<CallPage />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </Router>
  );
}

export default App;