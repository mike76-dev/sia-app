import { Outlet } from "react-router-dom";

// Assets
import authBackground from "@/assets/auth.png";

export default function AuthLayout() {
  return (
    <div className="flex flex-row w-full items-center h-screen">
      <div className="w-2/3">
        <img src={authBackground} alt="Sia Authentication" />
      </div>
      <div className="w-1/3 bg-[#27282D] h-full">
        <Outlet />
      </div>
    </div>
  );
}
