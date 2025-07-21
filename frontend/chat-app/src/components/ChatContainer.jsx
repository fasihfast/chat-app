import { useChathook } from "../hooks/useChathook";
import { useEffect, useRef, useState } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkele";
import useAuthhook from "../hooks/useAuthhook";
import { formatMessageTime } from "../lib/utils";
import toast from "react-hot-toast";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChathook();
  const { authUser } = useAuthhook();

  const messageEndRef = useRef(null);
  const [pinInput, setPinInput] = useState("");

  const exemptRoles = ["Technical Support", "Pre-Sales Consultation", "Sales And Billing"];
  const isExempted = exemptRoles.includes(authUser?.fullName);

  const [pinVerified, setPinVerified] = useState(isExempted || authUser?.pinVerified || false);

  useEffect(() => {
    if (pinVerified) {
      getMessages(selectedUser._id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser._id, pinVerified]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handlePinSubmit = () => {
    if (isExempted) return; // Do nothing if exempted
    if (pinInput === authUser?.pin) {
      setPinVerified(true);
    } else {
      toast.error("Invalid PIN. Please try again.");
    }
  };

  if (!pinVerified) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <div className="p-6 space-y-4 flex-1 flex flex-col justify-center items-center text-center">
          <div className="chat chat-start">
            <div className="chat-bubble text-md">🔒 Please verify your PIN to start chatting.</div>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              className="input input-bordered"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Enter PIN"
              disabled={isExempted}
            />
            <button
              onClick={handlePinSubmit}
              className="btn btn-primary"
              disabled={isExempted}
            >
              Verify
            </button>
          </div>
          {isExempted && (
            <p className="text-xs text-gray-500 mt-2">
              PIN verification not required for role: <strong>{authUser?.fullName}</strong>
            </p>
          )}
        </div>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
