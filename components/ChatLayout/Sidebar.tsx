"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function Sidebar({
  isOpen,
  setIsOpenAction,
}: {
  isOpen: boolean;
  setIsOpenAction: (state: boolean) => void;
}) {
  const [previousChats, setPreviousChats] = useState<Array<{ id: string }>>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      const dbName =
        typeof window !== "undefined"
          ? localStorage.getItem("databaseName")
          : "";
      if (!dbName) return;

      try {
        const res = await fetch("http://127.0.0.1:8000/api/get-chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ db_name: dbName }),
        });

        const data = await res.json();

        const chats = data.chats.map((chat: any) => ({
          id: chat.chat_id,
        }));

        setPreviousChats(chats);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setPreviousChats([]);
      }
    };

    fetchChats();
  }, []);

  const handleNewChat = async () => {
    const chatId = Date.now().toString();
    const dbName = localStorage.getItem("currentDatabase");

    const newChat = { id: chatId };
    const updatedChats = [...previousChats, newChat];
    setPreviousChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));

    if (dbName) {
      try {
        await fetch("http://127.0.0.1:8000/api/get-chat/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            db_name: dbName,
            chatId,
          }),
        });
      } catch (error) {
        console.error("Failed to save chat to backend:", error);
      }
    }

    router.push(`/chat/${chatId}`);
  };

  const handleOpenChat = (chatId: string) => {
    router.push(`/chat/${chatId}`);
  };

  const handleDeleteChat = async (chatId: string) => {
    const updatedChats = previousChats.filter((chat) => chat.id !== chatId);
    setPreviousChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));

    const dbName = localStorage.getItem("currentDatabase");
    if (dbName) {
      try {
        await fetch("http://127.0.0.1:8000/api/delete-chat/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            db_name: dbName,
            chat_id: chatId,
          }),
        });
      } catch (err) {
        console.error("Failed to delete chat from backend:", err);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpenAction(!isOpen)}
        className="fixed left-4 top-4 z-50 rounded-full border-2 border-gray bg-[#282a2e] p-2 text-white shadow-lg transition-all duration-300"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <motion.div
        animate={{ width: isOpen ? "20%" : "0px" }}
        className="fixed left-0 top-0 h-screen overflow-hidden bg-[#282a2e] text-white"
      >
        {isOpen && (
          <div className="flex h-full flex-col pt-16">
            {/* New Chat Button */}
            <button
              onClick={handleNewChat}
              className="m-4 flex w-[90%] items-center justify-start space-x-2 rounded-md bg-green px-4 py-2 text-white"
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
            <div className="text-gray-400 m-4 text-xs">Previous chats</div>
            <div>
              {previousChats.map((chat) => (
                <div
                  key={chat.id}
                  className="hover:bg-gray-700 m-2 mb-2 mt-2 flex cursor-pointer items-center justify-between rounded px-4 py-2 text-white"
                >
                  <span onClick={() => handleOpenChat(chat.id)}>
                    Chat ID: {chat.id}
                  </span>
                  <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="hover:text-red-500 ml-4"
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
                      <path d="M10 11v6"></path>
                      <path d="M14 11v6"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </>
  );
}
