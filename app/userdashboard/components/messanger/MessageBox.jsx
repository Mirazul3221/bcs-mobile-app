"use client";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { fetchAllFriendsByMessage } from "../../messanger/components/fetchdata";
import { useStore } from "@/app/global/DataProvider";
import Image from "next/image";
import loader from "@/public/loading-buffer.gif";
import MessageBar from "./MessageBar";
import { useGlobalData } from "../../global/globalDataProvider.jsx";
import { commonLogout } from "../common";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { PiMessengerLogoThin } from "react-icons/pi";

const MessageBox = ({
  sortedMessages,
  setCountUnreadMessage,
  messageContainerRef,
  toggleMessage,
}) => {
  const { store, dispatch: storeDisp } = useStore();
  const { dispatch } = useGlobalData();
  const [hiddenNumber, setHiddenNumber] = useState(false);

  const updateUnseenMessage = async (id) => {
    try {
      await axios.get(
        `${baseurl}/messanger/update-message-seen-status?senderId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
      commonLogout(storeDisp);
    }
  };

  const reRenderUserProfiles = async () => {
    const data = await fetchAllFriendsByMessage(store.token);
    dispatch({ type: "STORE_ALL_MESSANGER_USER", payload: data });
  };

  ///////////////////////////////////////////here is the logic for multiple user delete at a time/////////////////////////////////////////
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const timerRef = useRef(null);

  const handleLongPressStart = (id) => {
    timerRef.current = setTimeout(() => {
      setSelectedIds((prev) => [...prev, id]);
      setIsSelectMode(true);
    }, 500); // 500ms = long press
  };

  const handleLongPressEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const urlExecution = (name, id) => {
    if (!isSelectMode) {
      handleUrl(name, id);
    }
  };

  const toggleSelect = (fdid) => {
    setSelectedIds((prev) =>
      prev.includes(fdid) ? prev.filter((id) => id !== fdid) : [...prev, fdid]
    );
  };

  const handleDelete = async () => {
    const preAlert = confirm('Want to delete all message!');
    if(!preAlert) return
    try {
      await axios.post(
        `${baseurl}/messanger/delete-selected-message`,{selectedIds},
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
       dispatch({type:'STORE_MESSANGER_USER_AFTER_DELETE_SELECTED_USERS', payload:selectedIds})
    } catch (error) {
      console.log(error);
      commonLogout(storeDisp);
    }
    setSelectedIds([]);
    setIsSelectMode(false);
  };

  const handleUrl = (name, id) => {
    window.open(`${viewurl}/userdashboard/messanger/${name}/${id}`);
    //
  };

  useEffect(() => {
    if (selectedIds.length === 0) {
      setSelectedIds((prev) => (prev.length === 0 ? prev : []));
      setTimeout(() => setIsSelectMode(false), 100);
    }
  }, [selectedIds]);

  return (
    <div
      ref={messageContainerRef}
      className="md:absolute fixed pl-2 top-0 md:top-20 shadow-2xl py-4 right-0 md:right-40 w-full md:w-3/12 bg-white h-screen md:h-[80vh] border rounded-2xl z-50"
    >
      <div className="flex px-4 justify-between items-center">
        <h2 className="text-2xl">Chats</h2>
        {isSelectMode && <RiDeleteBin4Line className="cursor-pointer" onClick={handleDelete} />}
        <span className="md:hidden">closs</span>
      </div>
      {sortedMessages ? (
        <div className="w-full overflow-y-auto md:h-[70vh]">
          {sortedMessages &&
            sortedMessages.map((friend) => {
              return (
                <div
                  onMouseDown={() => handleLongPressStart(friend.userId)}
                  onMouseUp={handleLongPressEnd}
                  onMouseLeave={handleLongPressEnd}
                  onClick={() => {
                    reRenderUserProfiles();
                    setHiddenNumber(true);
                    updateUnseenMessage(friend?.userId);
                    setCountUnreadMessage(
                      (prev) => prev - friend.unseenMessageCount
                    );
                    urlExecution(friend?.userName, friend?.userId);
                  }}
                  key={friend.userId}
                  className="cursor-pointer flex items-center border-b duration-200 hover:bg-gray-100 rounded-b-2xl mb-1"
                >
                  <MessageBar friend={friend} hiddenNumber={hiddenNumber} />
                  {isSelectMode && (
                    <FaCheckCircle
                      onClick={() => toggleSelect(friend.userId)}
                      className={`text-sm ${
                        selectedIds.includes(friend.userId)
                          ? "text-green-600"
                          : "text-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Image className="-mt-20" src={loader} alt="Loading" />
        </div>
      )}
            {sortedMessages.length === 0 && <div className="absolute text-gray-700 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
            <PiMessengerLogoThin  size={80} />
            <h2 className="text-center text-[10px]">Message Not Found!</h2>
              </div>}
    </div>
  );
};

export default MessageBox;
