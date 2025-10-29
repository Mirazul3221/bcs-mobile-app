"use client";
import React from "react";
import Image from "next/image";
import register_background from "@/public/register_background.png";
import InputForm from "../components/Register";
import RegisterScenery from "../components/RegisterScenery";
import Logo from "../components/Logo";
import Link from "next/link";
const page = () => {
  return (
    <div className="h-screen max-w-[1440px] w-full mx-auto">
      <div className="flex p-6 justify-between items-center">
        <Logo w={100} />
        <h2 className="text-sm">
          <span className="hidden md:inline">Already have an account?</span>
          <Link href={"/login"}>
            <span className="px-2 py-1 rounded-md text-white ml-2 bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500">Log in</span>
          </Link>
        </h2>
      </div>

      <div className="flex items-center justify-center relative p-5">
        <div className="md:flex items-center justify-center p-4 md:p-10 rounded-md bg-white md:drop-shadow-2xl shadow-black md:w-2/3 overflow-hidden w-full">
          <div className="hidden w-1/2 md:block">
            <RegisterScenery />
          </div>
          <div className="md:w-1/2">
               <InputForm />
          </div>
        </div>
      </div>
              <div className="absolute -z-10 left-0 bottom-0 w-full">
          <Image
            className="h-[30vh] md:h-auto"
            src={register_background}
            alt="background"
          ></Image>
        </div>
    </div>
  );
};

export default page;
//
