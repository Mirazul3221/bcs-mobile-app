"use client";
import React, { memo, useCallback, useRef, useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2} from "react-icons/rx";

const QuestionCard = ({myQuestion, setIndex}) => {
  ///////////////////////////////////////////count clickedOption for each question////////////////////////////////////
  const [showClickedOptionInQuestion, setShowClickedOptionInQuestion] = useState(false);
 const isClickedQuestion = useRef(false)
  const totalCountedAns = myQuestion?.reactions.countOptions?.A + myQuestion?.reactions.countOptions?.B + myQuestion?.reactions.countOptions?.C + myQuestion?.reactions.countOptions?.D;
  const A = Math.floor((myQuestion?.reactions.countOptions?.A / totalCountedAns) * 100);
  const B = Math.floor((myQuestion?.reactions.countOptions?.B / totalCountedAns) * 100);
  const C = Math.floor((myQuestion?.reactions.countOptions?.C / totalCountedAns) * 100);
  const D = Math.floor((myQuestion?.reactions.countOptions?.D / totalCountedAns) * 100);
  ////////////////////////////////////////////////Count visitor record for each questions/////////////////////////////////
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
          e.currentTarget.classList.add("text-white");
          e.currentTarget.classList.add("bg-gradient-to-r");
          e.currentTarget.classList.add("from-[#7b54de]/60");
          e.currentTarget.classList.add("to-[#de54b5]/60");
          e.currentTarget.classList.add("border-[#810cf5]");
          e.currentTarget?.children[1]?.children[1]?.classList.remove("hidden");
        } else {
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
   setTimeout(() => {
    setIndex((p) => {
  if (p >= 2) {
    window.location.href = './register'
    return 2;
  } else {
    return p + 1;
  }
});
   }, 1000);
  }, []);
  return (
    <div className="border-t-4 md:border-t-1 relative text-gray-700 p-2 md:p-4 bg-white border rounded-md md:border max-w-screen">
      <div className="flex justify-between items-center">
      <h2 className="font-semibold text-gray-700">This question is added by <span className="bg-gradient-to-r from-[#f720b0] via-blue-600 to-cyan-500 bg-clip-text text-transparent">{myQuestion.userId.name}</span></h2>
      <img className="w-10 rounded-full shadow-md border" src={myQuestion.userId.profile} alt={myQuestion.userId.name} />
      </div>
      {myQuestion && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default memo(QuestionCard); //
