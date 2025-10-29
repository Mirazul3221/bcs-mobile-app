"use client";
// import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
// import CustomTimer from "./mainpage_components/timer";
// import Roboticx from "./mainpage_components/robotix";
import storeContext from "./global/createContex";
import AdminDashboard from "./admindashboard/AdminDashboard";
import AssistantHome from "./assistantdashboard/Home";
import Header from "./components/Header";
import "./anim.css";
import BannerSection from "./components/BannerSection";
import TurnAsHome from "./userdashboard/timeline/friends-question/TurnAsHome";
import Link from "next/link";
import RegisterScenery from "./components/RegisterScenery";
import InputForm from "./components/Register";
import { QuizPreview } from "@/components/quiz-preview";

export default function Home() {
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  const [isClient, setIsClient] = useState(false);
  const [orderAdd, setOrderAdd] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setOrderAdd(true);
    }, 5000);
  }, []);
  let number = [];
  for (let i = 1; i <= 100; i++) {
    number.push(i);
  }

  number.sort((a, b) => 0.5 - Math.random());

  useEffect(() => {
    setIsClient(true);
  }, []);
  const { store } = useContext(storeContext);
  // const `otp` = Math.floor(1000 + Math.random() * 9000);
  if (store?.userInfo?.role === "user") {
    return <div>{isClient ? <TurnAsHome /> : ""}</div>;
  } else if (store?.userInfo?.role === "admin") {
    return <div>{isClient ? <AdminDashboard /> : ""}</div>;
  } else if (store?.userInfo?.role === "assistant") {
    return <div>{isClient ? <AssistantHome /> : <></>}</div>;
  } else {
    return (
      <div>
        {isClient ? (
          <main className="h-screen w-screen relative mx-auto">
            <div className="bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500">
              <div>
                <div className="py-4">
                  <img
                    className="w-20 mx-auto"
                    src={"icons/icon-192x192.png"}
                  />
                </div>
              </div>
              <div className="p-2">
                <QuizPreview />
              </div>
              <div className="bg-white rounded-t-2xl w-full relative p-5">
                <h2 className="text-lg py-2 mb-2 text-center border-b">
                  <span className="inline">
                    Already have an account?
                  </span>
                  <Link href={"/login"}>
                    <span className="px-2 py-1 rounded-md text-white ml-2 bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500">
                      Log in
                    </span>
                  </Link>
                </h2>
                <InputForm />
              </div>
            </div>
          </main>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
