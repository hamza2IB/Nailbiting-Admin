"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/Splash";
import { useRouter, useSearchParams } from "next/navigation";

const SpectraLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams(); // Get query parameters

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const isTokenExpired = (token) => {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now(); // Assuming the token is a JWT
    };

    const currentPath = window.location.pathname;
    const isRegisterConfirm = currentPath.startsWith("/auth/register/confirm");

    if (accessToken && !isTokenExpired(accessToken)) {
      if (isRegisterConfirm) {
        // ✅ Allow navigation to the confirmation page
        setLoading(false);
      } else {
        router.replace("/users");
      }
    } else {
      router.push("/auth/login");
    }

    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            width: "100%",
          }}
        >
          {loading ? <Loader /> : <main style={{ flex: 1 }}>{children}</main>}
        </div>
      </body>
    </html>
  );
};

export default SpectraLayout;
export { SpectraLayout };