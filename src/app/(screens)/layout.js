"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Splash";
import Sidebar from "../../components/shared/Sidebar";

export default function RootLayout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const isTokenExpired = (token) => {
      if (!token) return true;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    };
    const currentPath = router.asPath;
    if (accessToken && !isTokenExpired(accessToken)) {
      if (currentPath && typeof currentPath === 'string') {
        redirect(currentPath);
      } else {
        console.log("Current path is undefined or not a string");
      }
    } else {
      localStorage.removeItem("accessToken");
      router.replace("/auth/login");
    }
    setTimeout(() => setLoading(false), 1000);
  }, [router]);

  return (
    <html lang="en">
      <body>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-row w-full">
              <Sidebar />
              <main className="flex pt-24 md:pt-0 w-full bg-[#F9FAFB] md:w-[calc(100%-300px)]">
                <div className="w-full">{children}</div>
              </main>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
