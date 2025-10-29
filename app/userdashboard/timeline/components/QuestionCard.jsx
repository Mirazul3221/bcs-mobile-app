"use client";
import { baseurl, viewurl } from "@/app/config";
import storeContext from "@/app/global/createContex";
import axios from "axios";
import HTMLReactParser from "html-react-parser";
import moment from "moment";
import React, { memo, useCallback, useContext, useRef, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2, RxOpenInNewWindow } from "react-icons/rx";
import CommentBox from "./CommentBox";
import { RiFileEditLine } from "react-icons/ri";
import { RiDeleteBin7Line } from "react-icons/ri";
import EditQuestion from "../create-post/components/EditQuestion";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { CountQuestionsCollection } from "../../global/common";
import { commonLogout } from "../../components/common";
import ProfileCard from "../../components/ProfileCard";
import { useEffect } from "react";
import { mathDocument } from "../../utils/mathJaxConfig";
import DisplayQuestion from "@/app/assistantdashboard/components/MathExpression";
import HtmlBodyParsarWithMathExp from "./HtmlBodyParsarWithMathExp";
import { useSocket } from "../../global/SocketProvider";
import CollectionsContainer from "./CollectionsContainer";

const QuestionCard = ({ questionsAfterDelete, myQuestion, Handler = null }) => {
  const { store, dispatch } = useContext(storeContext);
  const { myActiveFriends } = useSocket();
  const isOnline =
    myActiveFriends && myActiveFriends?.some((O) => O === myQuestion.userId);
  const [edit, setEdit] = useState(false);
  const [deleteQ, setDelete] = useState(false);
  ///////////////////////////////////////Collection seve function init/////////////////////////////
  const [openCollection, setOpenCollection] = useState(false);

  ///////////////////////////////////////////count clickedOption for each question////////////////////////////////////
  const [showClickedOptionInQuestion, setShowClickedOptionInQuestion] = useState(false);
 const isClickedQuestion = useRef(false)
  const totalCountedAns = myQuestion?.countOptions?.A + myQuestion?.countOptions?.B + myQuestion?.countOptions?.C + myQuestion?.countOptions?.D;
  const A = Math.floor((myQuestion?.countOptions?.A / totalCountedAns) * 100);
  const B = Math.floor((myQuestion?.countOptions?.B / totalCountedAns) * 100);
  const C = Math.floor((myQuestion?.countOptions?.C / totalCountedAns) * 100);
  const D = Math.floor((myQuestion?.countOptions?.D / totalCountedAns) * 100);
  ////////////////////////////////////////////////Count visitor record for each questions/////////////////////////////////
  const cardRef = useRef(null);
  const counted = useRef(false);

    useEffect(() => {
    const observer = new IntersectionObserver(
     async (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 1 && !counted.current) {     
      await axios.get(
        `${baseurl}/userquestions/visit/${myQuestion._id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );   
          counted.current = true;
          observer.unobserve(cardRef.current);
        }
      },
      { threshold: 1 } // fully visible (100%)
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [myQuestion._id]);

  //////////////////////////////////////////////////////////////////

  const dateFormate = (createdAt) => {
    const currentYear = moment().year();
    const postYear = moment(createdAt).year();
    const format =
      currentYear === postYear ? "D MMM h:mm A" : "D MMMM h:mm A YYYY";
    const formattedDate = moment(createdAt).format(format);
    return formattedDate;
  };

  useEffect(() => {
    const el = document.getElementById("math-container");

    if (el) {
      const wasHidden = el.offsetParent === null;

      if (wasHidden) {
        el.style.display = "block";
      }

      mathDocument.convert(el, { end: el });

      if (wasHidden) {
        el.style.display = "";
      }
    }
  }, [myQuestion.content]);

  const checkAns = useCallback((e, ans, question) => {
    if(isClickedQuestion.current) return
    isClickedQuestion.current = true
    setTimeout(() => {
      setShowClickedOptionInQuestion(true);
    }, 100);
    /////////////////////////////////////////////////////////////////////////////////////////
    // const mainTerget = questionsData[index].rightAns;
    const getAtter = e.currentTarget.parentElement.getAttribute("data-select");
    const getAtterIntoNumber = parseInt(getAtter);
    // setTimeout(() => {
    //   e.target.parentElement.parentElement.setAttribute(
    //     "data-select",
    //     getAtter + 1
    //   );
    // }, 100);
    const tergetContainer = e.currentTarget.parentElement.children;
    const tergetContainers = [
      tergetContainer[0],
      tergetContainer[1],
      tergetContainer[2],
      tergetContainer[3],
    ];
    if (e.currentTarget.classList.contains("__target_option__")) {
      if (getAtterIntoNumber == question.rightAns) {
        if (ans === question.rightAns) {
          store.userInfo.id !== question.userId &&
            CountQuestionsCollection("right", question, store.token,ans);
          e.currentTarget.classList.add("text-white");
          e.currentTarget.classList.add("bg-gradient-to-r");
          e.currentTarget.classList.add("from-[#7b54de]/60");
          e.currentTarget.classList.add("to-[#de54b5]/60");
          e.currentTarget.classList.add("border-[#810cf5]");
          e.currentTarget?.children[1]?.children[1]?.classList.remove("hidden");
        } else {
          store.userInfo.id !== question.userId &&
            CountQuestionsCollection("wrong", question, store.token,ans);
          const tergetDescBox =
            e.currentTarget.parentElement.parentElement.parentElement
              .children[2];
          e.currentTarget.classList.add("bg-rose-100");
          e.currentTarget.classList.add("border-rose-500");
          e.currentTarget?.children[1]?.children[0]?.classList.remove("hidden");
          tergetContainers[question.rightAns - 1].classList.add("text-white");
          tergetContainers[question.rightAns - 1].classList.add(
            "bg-gradient-to-r"
          );
          tergetContainers[question.rightAns - 1].classList.add(
            "from-[#7b54de]/60"
          );
          tergetContainers[question.rightAns - 1].classList.add(
            "to-[#de54b5]/60"
          );
          tergetContainers[question.rightAns - 1].classList.add(
            "border-[#810cf5]"
          );
          tergetContainers[
            question.rightAns - 1
          ].children[1].children[1].classList.remove("hidden");
          tergetDescBox?.classList.remove("hidden");
          setTimeout(() => {
            tergetDescBox?.classList.remove("scale-0");
            tergetDescBox?.classList.add("scale-100");
            tergetDescBox?.classList.add("duration-500");
          }, 100);
        }
      }
    }
  }, []);

  const handleDelete = async () => {
    try {
      const { data } = await axios.get(
        `${baseurl}/userquestions/delete-question/${myQuestion._id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      questionsAfterDelete(myQuestion);
      setDelete(false);
    } catch (error) {
      console.log(error);
      commonLogout(dispatch, error);
    }
  };

  const randomCount = Math.floor(Math.random() * 360 + 1);
  return (
    <div ref={cardRef} className="py-4 mb-4 border-t-4 md:border-t-1 relative text-gray-700 px-6 bg-white border rounded-md md:border max-w-screen">
      {myQuestion && (
        <div>
          <div className="flex justify-between">
            <div className="top flex items-center gap-2">
              <div>
                {myQuestion.profile ? (
                  <ProfileCard id={myQuestion.userId} Handler={Handler}>
                    <div className="w-10 relative">
                      {isOnline && (
                        <div className="absolute bottom-0 right-0 z-10 w-[12px] h-[12px] bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                      <img
                        className="w-full rounded-full hover:ring-[2px] cursor-pointer"
                        src={myQuestion.profile}
                        alt={myQuestion.userName}
                      />
                    </div>
                  </ProfileCard>
                ) : (
                  <div
                    style={{ background: `hsl(${randomCount}, 65%, 40%)` }}
                    className="w-10 h-10 text-white flex justify-center items-center uppercase text-2xl rounded-full"
                  >
                    {myQuestion.userName.split("")[0]}
                  </div>
                )}
              </div>
              <div className="">
                <ProfileCard id={myQuestion.userId} Handler={Handler}>
                  <h2 className="font-semibold text-md cursor-pointer hover:underline">
                    {myQuestion.userName}
                  </h2>
                </ProfileCard>
                <p className="text-sm">{dateFormate(myQuestion.createdAt)}</p>
              </div>
            </div>
            <div>
              {myQuestion.userId === store.userInfo.id ? (
                <div className="flex gap-2 bg-slate-50 py-1 px-2 rounded-lg border">
                  <RiFileEditLine
                    onClick={() => setEdit(true)}
                    className="cursor-pointer hover:text-black duration-300"
                  />
                  <RiDeleteBin7Line
                    onClick={() => setDelete(true)}
                    className="cursor-pointer hover:text-rose-600 duration-300"
                  />
                </div>
              ) : (
                <div className="flex gap-2 justify-center items-center">
                  <div className="md:hidden">
                    {myQuestion.isSaved ? (
                      <div
                        onClick={() => setOpenCollection(true)}
                        className="flex items-center gap-1 p-2 cursor-pointer duration-150 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-6 hidden md:block"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="size-5 md:hidden"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div
                        onClick={() => setOpenCollection(true)}
                        className="flex items-center gap-1 p-2 cursor-pointer duration-150 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6 hidden md:block"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5 md:hidden "
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* =============================Call container in here================================ */}
                  {openCollection && (
                    <>
                      <CollectionsContainer
                        questionId={myQuestion?._id}
                        setOpenCollection={setOpenCollection}
                      />
                    </>
                  )}
                  <div className="group relative duration-500">
                    <HiOutlineDotsHorizontal size={20} />
                    <div className="hidden absolute -right-6 group-hover:inline-block w-[200px] rounded-md text-center cursor-pointer bg-gray-100 py-1 px-4">
                      <a
                        className="flex items-center gap-2"
                        target="_blank"
                        href={`${viewurl}/userdashboard/timeline/${myQuestion.slug}`}
                      >
                        <RxOpenInNewWindow /> <span>Open in a new tab</span>
                      </a>{" "}
                    </div>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => questionsAfterDelete(myQuestion)}
                  >
                    <RxCross2 size={20} />
                  </div>
                </div>
              )}
              <div
                className={`${
                  deleteQ ? "scale-105" : "scale-0"
                } z-50 md:max-w-1/2 w-10/12 md:w-auto duration-150 px-4 md:px-10 py-6 shadow-md border-2 rounded-2xl bg-white -translate-x-[50%] -translate-y-[50%] fixed top-[50%] left-[50%]`}
              >
                <div className="flex justify-end">
                  <RxCross2
                    onClick={() => setDelete(false)}
                    className="cursor-pointer -mt-4 -mr-2 md:-mr-6"
                    size={18}
                  />
                </div>
                <h2 className="md:text-2xl text-lg mb-2">
                  Do you want to delete the question?
                </h2>
                <h4 className="text-sm md:text-md">{`"${myQuestion.question}"`}</h4>
                <div className="flex gap-2 justify-center mt-3">
                  <button
                    onClick={() => setDelete(false)}
                    className="bg-gray-100 px-2 rounded-md"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                    }}
                    className="bg-rose-200 px-2 rounded-md"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
            {/* ///////////////////////////////////////////////////////Edit Question Form//////////////////////////////////////////////// */}
            {edit && (
              <div className="fixed z-50 flex justify-center items-center bg-slate-300/70 top-0 left-0 w-screen h-screen">
                <div className="bg-white">
                  <h2 className="md:text-2xl p-4 text-center font-bold text-gray-500 mb-2">
                    Edit the question
                  </h2>
                  <div className="flex justify-end pr-10">
                    <button onClick={() => setEdit(false)}>
                      <RxCross2 size={25} />
                    </button>
                  </div>
                  <div className="h-[80vh] p-2 rounded-md overflow-auto">
                    <EditQuestion Q={myQuestion} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="middle mt-2 text-sm md:text-inherit">
            <h2 className="mb-2 border-b pb-2">
              <span className="px-2 mr-2 rounded-lg bg-gray-50 border">
                {myQuestion.subject}
              </span>
              | {myQuestion.chapter}
            </h2>
            <h2>Question: {myQuestion.question}</h2>
            {/* ////////////////////////////////////////Here Start all Question options//////////////////////////////////////////////// */}
            <div data-select={myQuestion.rightAns} className="py-2 space-y-2">
              <div
                onClick={(e) => checkAns(e, 1, myQuestion)}
                className="__target_option__ flex halimon items-center gap-2 border bg-gray-50/50 pl-2 py-2 rounded-md cursor-pointer relative"
              >
                {showClickedOptionInQuestion && totalCountedAns > 0 && (
                  <div className="absolute top-0 z-0 left-0 h-full w-full">
                    <p className="absolute right-0 h-full w-fit mr-5 flex items-center">
                      {A}%
                    </p>
                    <div
                      style={{ width: `${A}%` }}
                      className="h-full rounded-r-md bg-black/10"
                    ></div>
                  </div>
                )}
                <h2 className="border rleative z-10 rounded-full w-4 h-4 flex justify-center items-center">
                  {myQuestion.subject === "বাংলা"
                    ? "ক"
                    : myQuestion.subject === "ইংরেজি"
                    ? "A"
                    : "ক"}
                </h2>
                <h3 className="w-full flex justify-between items-center pr-2 rleative z-10">
                  {myQuestion.option_01}{" "}
                  <span className="hidden">
                    <RxCross2 color="white" size={12} />
                  </span>{" "}
                  <span className="hidden">
                    <GiCheckMark size={12} color="white" />
                  </span>
                </h3>
              </div>
              <div
                onClick={(e) => checkAns(e, 2, myQuestion)}
                className="__target_option__ flex items-center gap-2 bg-gray-50 border pl-2 py-2 rounded-md cursor-pointer relative"
              >
                {showClickedOptionInQuestion && totalCountedAns > 0 && (
                  <div className="absolute top-0 z-0 left-0 h-full w-full">
                    <p className="absolute right-0 h-full w-fit mr-5 flex items-center">
                      {B}%
                    </p>
                    <div
                      style={{ width: `${B}%` }}
                      className="h-full bg-black/10 rounded-r-md"
                    ></div>
                  </div>
                )}
                <h2 className="border rleative z-10 rounded-full w-4 h-4 flex justify-center items-center">
                  {myQuestion.subject === "বাংলা"
                    ? "খ"
                    : myQuestion.subject === "ইংরেজি"
                    ? "B"
                    : "খ"}
                </h2>
                <h3 className="rleative z-10 w-full flex justify-between items-center pr-2">
                  {myQuestion.option_02}{" "}
                  <span className="hidden">
                    <RxCross2 color="white" size={12} />
                  </span>{" "}
                  <span className="hidden">
                    <GiCheckMark size={12} color="white" />
                  </span>
                </h3>
              </div>
              <div
                onClick={(e) => checkAns(e, 3, myQuestion)}
                className="__target_option__ flex items-center gap-2 bg-gray-50 border pl-2 py-2 rounded-md cursor-pointer relative"
              >
                {showClickedOptionInQuestion && totalCountedAns > 0 && (
                  <div className="absolute top-0 z-0 left-0 h-full w-full">
                    <p className="absolute right-0 h-full w-fit mr-5 flex items-center">
                      {C}%
                    </p>
                    <div
                      style={{ width: `${C}%` }}
                      className="h-full bg-black/10 rounded-r-md"
                    ></div>
                  </div>
                )}
                <h2 className="border rounded-full w-4 h-4 flex justify-center items-center rleative z-10">
                  {myQuestion.subject === "বাংলা"
                    ? "গ"
                    : myQuestion.subject === "ইংরেজি"
                    ? "C"
                    : "গ"}
                </h2>
                <h3 className="w-full flex justify-between items-center pr-2 rleative z-10">
                  {myQuestion.option_03}{" "}
                  <span className="hidden">
                    <RxCross2 color="white" size={12} />
                  </span>{" "}
                  <span className="hidden">
                    <GiCheckMark size={12} color="white" />
                  </span>
                </h3>
              </div>
              <div
                onClick={(e) => checkAns(e, 4, myQuestion)}
                className="__target_option__ flex items-center gap-2 bg-gray-50 border pl-2 py-2 rounded-md cursor-pointer relative"
              >
                {showClickedOptionInQuestion && totalCountedAns > 0 && (
                  <div className="absolute top-0 z-0 left-0 h-full w-full">
                    <p className="absolute right-0 h-full w-fit mr-5 flex items-center">
                      {D}%
                    </p>
                    <div
                      style={{ width: `${D}%` }}
                      className="h-full bg-black/10 rounded-r-md"
                    ></div>
                  </div>
                )}
                <h2 className="border rounded-full w-4 h-4 flex justify-center items-center rleative z-10">
                  {myQuestion.subject === "বাংলা"
                    ? "ঘ"
                    : myQuestion.subject === "ইংরেজি"
                    ? "D"
                    : "ঘ"}
                </h2>
                <h3 className="w-full flex justify-between items-center pr-2 rleative z-10">
                  {myQuestion.option_04}
                  <span className="hidden">
                    <RxCross2 color="white" size={12} />
                  </span>
                  <span className="hidden">
                    <GiCheckMark size={12} color="white" />
                  </span>
                </h3>
              </div>
            </div>
            {/* ////////////////////////////////////////Here end all Question options//////////////////////////////////////////////// */}
          </div>
          {myQuestion.content && (
            <div
              className={`desc border-t scale-0 mt-2 pt-2 w-[82vw] md:w-full max-h-screen hidden duration-500 overflow-auto`}
            >
              <HtmlBodyParsarWithMathExp content={myQuestion.content} />
            </div>
          )}
        </div>
      )}

      <div className="mt-2 duration-300">
        <CommentBox question={myQuestion} Handler={Handler} />
      </div>
    </div>
  );
};

export default memo(QuestionCard); //
