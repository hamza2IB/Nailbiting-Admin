"use client";
import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UsersIcon from "../../../public/svgs/components/usersIcon";
import VideosIcon from "../../../public/svgs/components/VideosIcon";
import NewsIcon from "../../../public/svgs/components/NewsIcon";
import SettingsIcon from "../../../public/svgs/components/SettingsIcon";
import LogoutIcon from "../../../public/svgs/components/LogoutIcon";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);
  const pathname = usePathname();
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    const handleClickOutside = (event) => {
      if (
        window.innerWidth < 768 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      name: "ユーザー管理",
      path: "/users",
      icon: (
        <UsersIcon
          width={24}
          height={24}
          stroke={pathname === "/users" ? "white" : "black"}
        />
      ),
    },
    {
      name: "動画管理",
      path: "/videos",
      icon: (
        <VideosIcon
          width={24}
          height={24}
          stroke={pathname === "/videos" ? "white" : "black"}
        />
      ),
    },
    {
      name: "お知らせ管理",
      path: "/news",
      icon: (
        <NewsIcon
          width={24}
          height={24}
          stroke={pathname === "/news" ? "white" : "black"}
        />
      ),
    },
  ];
  const navItems2 = [
    {
      name: "設定",
      path: "/setting",
      icon: (
        <SettingsIcon
          width={24}
          height={24}
          stroke={pathname === "/setting" ? "white" : "black"}
        />
      ),
    },
    {
      name: "ログアウト",
      path: "/auth/login",
      icon: (
        <LogoutIcon
          width={24}
          height={24}
          stroke={pathname === "/auth/login" ? "white" : "black"}
        />
      ),
      action: logout,
    },
  ];

  return (
    <div
      className={`transition-all duration-300 ${
        isOpen ? "relative" : "absolute"
      }`}
      style={{
        width: isOpen ? "300px" : "50px",
        overflow: "hidden",
        height: "100vh",
        zIndex: isOpen ? 10 : 5,
      }}
    >
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="hamburger fixed   left-0  top-0 w-full text-black py-6 px-6 rounded bg-white z-[9999] shadow"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32px"
            height="32px"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M4 18H10"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 12L16 12"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M4 6L20 6"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="hamburger bg-blue-500 text-white p-2 rounded"
        ></button>
      )}
      {isOpen && (
        <nav
          ref={sidebarRef}
          className={`sidebar p-6 py-[32px] bg-white w-[300px] flex flex-col justify-between text-black h-full fixed left-0 top-0 shadow-lg ${
            isOpen ? "block" : "hidden"
          }`}
        >
        
          <ul className="flex flex-col gap-3">
          <div className="flex justify-end md:hidden"  onClick={toggleSidebar}>
          <svg className="fill-current" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" fill=""></path></svg>
          </div>
          <Link href="/">
            <div className="flex justify-between mb-[54px] items-center">
            
              <Image
                src="/svgs/logoSide.svg"
                alt="Logo"
                width={265}
                height={72}
                className="text-white"
              />
              {/* <h1 className="text-[25px] text-[#199A8E]">爪噛み症アプリ</h1> */}
            </div>
            </Link>
            {navItems.map((item) => (
              <Link href={item.path} key={item.path}>
                <li
                  key={item.path}
                  className={`px-3 py-2 rounded-[6px] flex gap-3 items-center ${
                    pathname === item.path
                      ? "bg-[#199A8E] text-white font-bold hover:bg-[#199A8E]" // Active style
                      : "hover:bg-[#199a8d4f]"
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar(); // Close sidebar on click for small screens
                    }
                  }}
                >
                  {item.icon}
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <ul className="flex flex-col gap-3">
            {navItems2.map((item) => (
              <Link href={item.path} key={item.path}>
                <li
                  key={item.path}
                  className={`px-3 py-2 rounded-[6px] flex gap-3 items-center hover:bg-[#199a8d4f] ${
                    pathname === item.path
                      ? "bg-[#199A8E] text-white font-bold hover:bg-[#199A8E]" // Active style
                      : ""
                  }`}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    }
                    if (window.innerWidth < 768) {
                      toggleSidebar(); // Close sidebar on click for small screens
                    }
                  }}
                >
                  {item.icon}
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
