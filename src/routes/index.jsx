import { Routes, Route } from "react-router-dom";

import ForgotPasswordPage from "../pages/forgotpassword";
import LandingPage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import FileConversationPage from "../pages/app";
import LeadPage from "../pages/lead";
import BotFormUI from "../pages/formBot";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<BotFormUI />} />
      {/* <Route path="/form-bot" element={<BotFormUI />} /> */}
      {/* <Route path="/lead-ai" element={<LeadPage />} /> */}
      <Route path="/landing-page" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/app" element={<FileConversationPage />} />
    </Routes>
  );
};

export default AppRoutes;
