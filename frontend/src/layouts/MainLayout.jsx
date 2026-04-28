import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Chatbot from "../components/layout/chatbot";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="bg-slate-50 min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
      <Chatbot />
    </>
  );
}