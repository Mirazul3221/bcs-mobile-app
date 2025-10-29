import moment from "moment";
import React from "react";
import { BsReply, BsThreeDotsVertical } from "react-icons/bs";

const EmojiControllerContainer = () => {
      const emojies = ["❤️", "😍", "😭", "😮", "😡"];
        const controllEmoji = (e, ctl, identifire) => {
    if (identifire === "me") {
      e.target.parentElement.children[2].classList.add("-left-[250%]");
    }
    if (identifire === "friend") {
      e.target.parentElement.children[2].classList.add("-left-[150%]");
    }

    if (ctl == "add") {
      e.target.parentElement.children[0].classList.add("hidden");
      e.target.parentElement.children[1].classList.remove("hidden");
      e.target.parentElement.children[2].classList.remove("hidden");
      e.target.parentElement.children[2].classList.add("flex");
      setTimeout(() => {
        e.target.parentElement.children[0].classList.remove("hidden");
        e.target.parentElement.children[1].classList.add("hidden");
        e.target.parentElement.children[2].classList.add("hidden");
        e.target.parentElement.children[2].classList.remove("flex");
      }, 5000);
    }
    if (ctl == "remove") {
      e.target.parentElement.children[0].classList.remove("hidden");
      e.target.parentElement.children[1].classList.add("hidden");
      e.target.parentElement.children[2].classList.add("hidden");
      e.target.parentElement.children[2].classList.remove("flex");
    }
    //  e.target.parentElement.children[1].classList.remove('hidden')
  };
  return (
    <div className="w-full h-full bg-amber-400 bottom-0 left-0 z-50 absolute">
      
    </div>
  );
};

export default EmojiControllerContainer;
