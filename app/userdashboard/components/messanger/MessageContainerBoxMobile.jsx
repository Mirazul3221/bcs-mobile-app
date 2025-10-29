"use client";
import { baseurl, viewurl } from "@/app/config";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { fetchAllFriendsByMessage } from "../../messanger/components/fetchdata";
import { useStore } from "@/app/global/DataProvider";
import { useSocket } from "../../global/SocketProvider";
import { formatetime } from "./components/time";
import Image from "next/image";
import loader from "@/public/loading-buffer.gif";
import Middle from "../../messanger/components/MessageContainerMiddle";
import { GrRotateRight } from "react-icons/gr";
import { LiaTimesSolid } from "react-icons/lia";
import MessageBar from "./MessageBar";
import { useGlobalData } from "../../global/globalDataProvider.jsx";
import { commonLogout } from "../common";
import { LuMessageCircleWarning } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin4Line } from "react-icons/ri";
import { PiMessengerLogoThin } from "react-icons/pi";

const MessageContainerBoxMobile = ({
  sortedMessages,
  setIsOpenMobileMessage,
  setCountUnreadMessage,
}) => {
  const { myActiveFriends, socket } = useSocket();
  const [openWindow, setOpenWindow] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hiddenNumber, setHiddenNumber] = useState(false);
  const { store, dispatch: storeDispatch } = useStore();
  const { dispatch } = useGlobalData();
  const updateUnseenMessage = async (id) => {
    try {
      setLoading(true);
      await axios.get(
        `${baseurl}/messanger/update-message-seen-status?senderId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      commonLogout(storeDispatch);
    }
  };

  const fetchUser = async (id) => {
    try {
      const { data } = await axios.get(`${baseurl}/auth/get-profile/${id}`);
      setUserDetails(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUser(userId);
  }, [userId, openWindow]);

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
    if (!isSelectMode) return;
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
       dispatch({type:'STORE_MESSANGER_USER_AFTER_DELETE_SELECTED_USERS',payload:selectedIds})
    } catch (error) {
      console.log(error);
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

  const openInNewWindow = () => {
    if (!isSelectMode) {
      setOpenWindow(true);
    }
  };
  return (
    <div className="fixed overflow-hidden w-screen left-0 top-0 shadow-2xl right-0 bg-white h-screen z-50">
      {!openWindow && (
        <div className="w-[100vw] overflow-hidden">
          <div className="flex items-center px-4 pr-6 md:block justify-between mt-4">
            <h2 className="text-2xl">Chats</h2>
        {isSelectMode && <RiDeleteBin4Line className="cursor-pointer" onClick={handleDelete} />}
            <span
              onClick={() => {
                setIsOpenMobileMessage(false);
              }}
              className="md:hidden"
            >
              <LiaTimesSolid size={25} />
            </span>
          </div>
          {sortedMessages ? (
            <div className="w-full overflow-y-scroll">
              {sortedMessages &&
                sortedMessages.map((friend, i) => {
                  return (
                    <div
                      onMouseDown={() => handleLongPressStart(friend.userId)}
                      onMouseUp={handleLongPressEnd}
                      onMouseLeave={handleLongPressEnd}
                      onTouchStart={() => {
                        handleLongPressStart(friend.userId);
                      }}
                      onTouchEnd={handleLongPressEnd}
                      onClick={() => {
                        setUserDetails(null);
                        setUserId(friend.userId);
                        openInNewWindow();
                        updateUnseenMessage(friend?.userId);
                        setCountUnreadMessage(
                          (prev) => prev - friend.unseenMessageCount
                        );
                        toggleSelect(friend.userId);
                        setHiddenNumber(true);
                        reRenderUserProfiles();
                      }}
                      key={i}
                      className={`cursor-pointer overflow-hidden flex items-center duration-200 mb-1 justify-between pr-2  ${
                        selectedIds.includes(friend.userId)
                          ? "bg-gray-100"
                          : ""
                      }`}
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
        </div>
      )}
      <div
        className={`w-[100vw] ${
          openWindow ? "scale-1 w-full h-full" : "scale-0 w-0 h-0"
        } relative overflow-hidden`}
      >
        {openWindow && (
          <Middle
            id={userId}
            userDetails={userDetails}
            device="mobile"
            setOpenWindow={setOpenWindow}
          />
        )}
      </div>
      {sortedMessages.length === 0 && <div className="absolute text-gray-700 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]">
      <PiMessengerLogoThin  size={200} />
      <h2 className="text-center">Message Not Found!</h2>
        </div>}
    </div>
  );
};

export default MessageContainerBoxMobile;
