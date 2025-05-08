import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

import { getCookie } from "@/lib/cookie";

export default function PrivateRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const cookieToken = getCookie("X-Satellite-Token");

    const checkAuth = async () => {
      try {
        if (token && token.length === 256) {
          const res = await fetch("/api/auth", {
            method: "GET",
            headers: { "X-Satellite-Token": token },
            credentials: "include",
          });

          if (res.status === 204) {
            if (document.cookie.includes("X-Satellite-Change")) {
              navigate("/forgot-password?token=" + token);
            } else {
              navigate("/dashboard");
            }
          } else {
            navigate("/auth/login");
          }
        } else if (cookieToken) {
          const res = await fetch("/api/auth", {
            method: "GET",
            credentials: "include",
          });

          if (res.status === 204) {
            console.log("User is authenticated, staying on dashboard");
          } else {
            navigate("/auth/login");
          }
        } else {
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        navigate("/auth/login");
      }
    };

    checkAuth();
  }, [navigate]);

  return <Outlet />;
}
