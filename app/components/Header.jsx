'use client'
import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import { FaBars } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import Search from "./Search";
import { usePathname, useRouter } from "next/navigation";
const Header = ({}) => {
  const [switcher, setSwitcher] = useState(false);
  const [switcher1, setSwitcher1] = useState(false);
  const route = usePathname()
 //=============set scroll for header================
 const [header,setHeader] = useState(false)
 const scrollHeader = ()=>{
    if (window.scrollY >= 200) {
      setHeader(true)
    } else {
      setHeader(false)
    }
 }
 useEffect(() => {
  window.addEventListener("scroll",scrollHeader)
  return () => {
    window.removeEventListener("scroll",scrollHeader)
  };
 }, []);

  return (
    <div className="flex justify-around items-center">
        <img className="w-10" src="/icons/icon-192x192.png" alt="logo" />
                  <Link href={"/login"}>
            <li className="bg-gradient-to-r from-[#f720b0]/50 via-blue-600 to-cyan-500 font-normal px-4 ml-2 py-[2px] text-white w-fit cursor-pointer duration-500 rounded-md">
              Log In
            </li>
          </Link>
          <Link href={"/register"}>
            <li className="bg-gradient-to-r from-[#f720b0]/50 via-blue-600 to-cyan-500 font-normal px-4 ml-2 py-[2px] text-white w-fit cursor-pointer duration-500 rounded-md">
              Sign Up
            </li>
          </Link>
    </div>
  );
};

export default Header;
