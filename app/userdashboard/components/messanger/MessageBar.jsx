import React, { useRef, useState } from "react";
import { formatetime } from "./components/time";
import { useSocket } from "../../global/SocketProvider";
import { useStore } from "@/app/global/DataProvider";
import { FaCheckCircle, FaImage } from "react-icons/fa";
import { MdSettingsVoice } from "react-icons/md";
import { BsFillFileImageFill } from "react-icons/bs";
import { viewurl } from "@/app/config";

const MessageBar = ({ friend, hiddenNumber }) => {
  const { myActiveFriends } = useSocket();
  const { store } = useStore();
  return (
    <div
      className={`px-6 relative flex gap-4 items-center py-2 duration-100`}
    >
      <div className="relative">
        <img
          className="w-12 rounded-full"
          src={friend.userProfile}
          alt={friend.userName}
        />
        {myActiveFriends?.includes(friend.userId) ? (
          <div className="w-3 h-3 border-2 border-white bg-green-500 absolute rounded-full -right-[2px] bottom-1"></div>
        ) : (
          ""
        )}
      </div>
      <div>
        <div className="flex gap-4 items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-700">
            {friend.userName.split(" ")[0]}
          </h2>

          <p className="text-[12px] text-slate-500">
            {formatetime(friend.lastMessageTime)}
          </p>
        </div>
        <div className="text-slate-700 flex items-center">
          {friend.senderId === store.userInfo.id ? (
            <h2 className="font-semibold">You : </h2>
          ) : (
            ""
          )}

          {friend?.lastMessage?.type === "image" && <FaImage size={20} />}

          {friend?.lastMessage?.type === "voice" && (
            <MdSettingsVoice size={20} />
          )}
          {friend?.lastMessage?.type === "story" && (
            <BsFillFileImageFill size={20} />
          )}

          {friend?.lastMessage?.type === "text" && (
            <span>
              {friend?.lastMessage?.content?.length > 20
                ? friend.lastMessage.content.slice(0, 20) + "......"
                : friend?.lastMessage?.content}
            </span>
          )}
        </div>
      </div>
      {friend?.unseenMessageCount > 0 && !hiddenNumber && (
        <div className="absolute top-[50%] -translate-y-[50%] right-5 bg-rose-100 text-gray-700 p-1 w-4 h-4 flex justify-center items-center rounded-full shadow-md text-[10px]">
          {friend?.unseenMessageCount}
        </div>
      )}
    </div>
  );
};

export default MessageBar;
