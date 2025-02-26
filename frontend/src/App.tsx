import { Route, Routes } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider";
import AuthLayout from "./layouts/AuthLayout";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "./components/ui/sonner";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ChatPage from "./pages/ChatPage";
import WelcomePage from "./pages/WelcomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PreChatPage from "./pages/PreChatPage";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<HomePage />}>
            <Route index element={<WelcomePage />} />
            <Route path="chat/user/:userId" element={<PreChatPage />} />
            <Route path="chat/:chatId" element={<ChatPage />} />
          </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </ThemeProvider>
  );
}
