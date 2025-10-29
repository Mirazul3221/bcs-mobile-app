"use client";
import React, { useContext } from "react";
import Image from "next/image";
import register_background from "@/public/register_background.png";
import RegisterScenery from "../components/RegisterScenery";
import InputForm from "../components/Login";
import Logo from "../components/Logo";
import Link from "next/link";
// import storeContext from "../global/createContex";
const page = () => {
  return (
    <div className="md:h-screen max-w-[1440px]">
      <div className="flex p-6 justify-between items-center">
        <Logo w={100} />
        <h2 className="text-sm">
          <span className="hidden md:inline">Don't have an account?</span>
          <Link href={"/register"}>
            <span className="px-2 py-1 rounded-md text-white ml-2 bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500">Sign up</span>
          </Link>
        </h2>
      </div>
      <div className="md:flex md:mt-0 items-center justify-center relative w-full mx-auto">
        <div className="md:flex md:p-6 bg-white rounded-md md:drop-shadow-2xl shadow-black md:w-2/3">
          <div className="hidden w-1/2 md:block">
            <img className="" src="login.jpg" alt="login" />
          </div>
          <div className="md:w-1/2">
            <InputForm />
          </div>
        </div>
      </div>
      <div className="absolute -z-10 left-0 bottom-0 w-full">
        <Image
          className="h-[30vh] w-full md:h-auto"
          src={register_background}
          alt="background"
        ></Image>
      </div>
    </div>
  );
};

export default page;
