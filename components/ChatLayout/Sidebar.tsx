"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [previousChats, setPreviousChats] = useState<string[]>([]); // Ensure it's an array
  const router = useRouter();

  useEffect(() => {
    // Load previous chats from localStorage on mount
    const chats = JSON.parse(localStorage.getItem("chats") || "[]");
    if (Array.isArray(chats)) {
      setPreviousChats(chats);
    } else {
      setPreviousChats([]); // Fallback to empty array if data is invalid
    }
  }, []);

  const handleNewChat = () => {
    const chatId = Date.now().toString(); // Generate a unique ID
    const updatedChats = [...previousChats, chatId];
    setPreviousChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats)); // Save chats to localStorage
    router.push(`/chat/${chatId}`);
  };

  const handleOpenChat = (chatId: string) => {
    router.push(`/chat/${chatId}`); // Navigate to the selected chat
  };

  return (
    <div className="flex h-screen flex-col bg-[#282a2e] p-2">
      <div className="flex-1">
        <div>
          {/* New Chat Button */}
          <button
            onClick={handleNewChat}
            className="m-4 mx-4 flex w-[90%] items-center justify-start space-x-2 rounded-md bg-green px-10 py-2 text-white hover:opacity-70"
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

          {/* Previous Chats */}
          <div className="text-gray-400 m-4 mx-8 text-xs">Previous chats</div>
          <div>
            {previousChats.map((chatId) => (
              <div
                key={chatId}
                onClick={() => handleOpenChat(chatId)}
                className="bg-gray-800 hover:bg-gray-700 cursor-pointer rounded px-4 py-2 text-white"
              >
                Chat ID: {chatId}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
