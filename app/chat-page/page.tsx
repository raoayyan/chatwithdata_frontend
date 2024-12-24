"use client";
import React, { useState } from "react";

export default function ChatPage() {
  const [chats, setChats] = useState([]); // Array to hold all chats
  const [currentChatIndex, setCurrentChatIndex] = useState(0); // Index of the current chat
  const [currentMessage, setCurrentMessage] = useState(""); // Current message being typed

  // Add message to the current chat
  const handleSendMessage = () => {
    if (currentMessage.trim() === "") return; // Ignore empty messages

    const updatedChats = [...chats];
    updatedChats[currentChatIndex] = [
      ...(updatedChats[currentChatIndex] || []),
      currentMessage,
    ];

    setChats(updatedChats);
    setCurrentMessage(""); // Clear input field
  };

  // Start a new chat
  const handleNewChat = () => {
    setChats([...chats, []]); // Add a new empty chat to the chats array
    setCurrentChatIndex(chats.length); // Set the new chat as the current chat
  };

  // Delete a chat
  const handleDeleteChat = (index) => {
    const updatedChats = chats.filter((_, chatIndex) => chatIndex !== index);
    setChats(updatedChats);

    // Adjust current chat index if necessary
    if (currentChatIndex >= updatedChats.length) {
      setCurrentChatIndex(Math.max(0, updatedChats.length - 1));
    }
  };

  return (
    <div className="flex h-[100vh] text-black">
      {/* Left Sidebar */}
      <div className="left w-[20%] bg-[#282a2e] text-white">
        <button
          onClick={handleNewChat}
          className="m-4 mx-4 flex w-[90%] items-center justify-start space-x-2 rounded-md border border-black bg-green px-10 py-2 hover:opacity-70"
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span>New Chat</span>
        </button>
        <div className="text-gray-400 m-4 mx-8 text-xs">Previous chats</div>
        <div className="chats flex flex-col items-center justify-center space-y-2">
          {chats.map((_, index) => (
            <div
              key={index}
              className={`chat flex w-[90%] cursor-pointer items-center justify-between rounded-md px-5 py-2 opacity-80 ${
                index === currentChatIndex ? "bg-gray-500" : "bg-gray-600"
              }`}
            >
              <div
                onClick={() => setCurrentChatIndex(index)}
                className="flex items-center space-x-2"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Chat {index + 1}</span>
              </div>
              <button
                onClick={() => handleDeleteChat(index)}
                className="hover:opacity-70"
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-2 14H7L5 6"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex w-[80%] flex-col">
        <div className="w-full text-center">
          <h1 className="mb-2 text-3xl font-bold">CHAT WITH DATA</h1>
          <p>Ask your question, and I'll provide the best solution!</p>
        </div>
        <div className="flex h-[73vh] w-full flex-col overflow-y-auto border p-4">
          {(chats[currentChatIndex] || []).map((message, index) => (
            <div
              key={index}
              className={`message my-2 rounded-md p-2 ${
                index % 2 === 0
                  ? "bg-gray-300 text-left"
                  : "bg-green-200 text-right"
              }`}
            >
              {message}
            </div>
          ))}
        </div>
        <div className="input mt-4 flex w-full items-center justify-center">
          <div className="buttonsvg flex w-[50vw]">
            <input
              className="w-full rounded-xl border-2 border-black bg-lightgray p-4"
              placeholder="Send a Message"
              type="text"
              name="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button
              onClick={handleSendMessage}
              className="relative -left-20 pl-10 hover:opacity-70"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
