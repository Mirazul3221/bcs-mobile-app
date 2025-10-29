"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { baseurl, viewurl } from "../config";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Logo from "./Logo";
import loaderImg from "@/public/loader.gif";
import Image from "next/image";
import { useStore } from "../global/DataProvider";
const InputForm = () => {
  const {dispatch} = useStore()
  const [alert, setAlert] = useState("");
  const [loader,setLoader] = useState(false)
  const [bouncing,setBouncing] = useState(false)
  //  const [location, setLocation] = useState({ lat:-39.145175, lon: -128.232097});
  const [submitValue, setSubmitValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const targetElement = (e) => {
    setSubmitValue({
      ...submitValue,
      [e.target.name]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let uri = `${baseurl}/auth/verify-account`;
      setLoader(true)
      const { data } = await axios.post(uri, submitValue);
      setLoader(false);
      setAlert('Check your mailbox and verify account')
      setBouncing(true)
    } catch (error) {
      setLoader(false)
      setAlert(error.response?.data.message);
     
    }
  };
  return (
    <div>
      <div className="w-full">
        <form onSubmit={handlesubmit}>
          <div>
            <h2 className={`${alert == 'Check your mailbox and verify account' ? "text-green-300" : "text-rose-300"}`}>{alert}</h2>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-lg font-semibold ml-2 text-gray-900 dark:text-white">
                Name
              </label>
              <input
                onChange={targetElement}
                value={submitValue.name}
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 p-4 mb-4 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-semibold ml-2 text-gray-900 dark:text-white">
                Email address
              </label>
              <input
                onChange={targetElement}
                value={submitValue.email}
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 p-4 mb-4 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-semibold ml-2 text-gray-900 dark:text-white">
                Password
              </label>
              <input
                onChange={targetElement}
                value={submitValue.password}
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 p-4 mb-4 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••"
                required
              />
              <button
              disabled={bouncing}
              type="submit"
              className={`mt-4 ${
                loader
                  ? ""
                  : "bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500 text-white duration-500"
              } border p-4 rounded-full w-full flex justify-center items-center`}
            >
              {loader ? (
                <div className="flex justify-center items-center gap-2">
                  <h2>Loading</h2>
                  <Image src={loaderImg} className="w-5" alt="Loader" />
                </div>
              ) : (
                <h2 className="font-semibold text-2xl">Verify Account</h2>
              )}
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
