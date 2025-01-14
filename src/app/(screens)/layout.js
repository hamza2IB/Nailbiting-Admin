"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Splash";
import Sidebar from "../../components/shared/Sidebar";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

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
