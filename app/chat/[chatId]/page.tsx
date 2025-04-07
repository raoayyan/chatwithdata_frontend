"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ChatPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<
    Array<{ type: string; text: string; data?: any }>
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [canvasData, setCanvasData] = useState(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [firstMessageSent, setFirstMessageSent] = useState(false);
  const databaseName =
    typeof window !== "undefined" ? localStorage.getItem("databaseName") : "";

  // Function to send query to the backend for processing
  const sendQueryToBackend = async (query: string, dbName: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/chat_with_database/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_query: query, database_name: dbName }),
      }
    );

    if (!response.ok) throw new Error("Failed to send query");

    const data = await response.json();
    return data;
  };

  // Function to store chats in a separate chat-storage API
  // Function to store only the query
  const storeChatQuery = async (query: string) => {
    try {
      const payload: any = {
        user_query: query,
      };

      // Send chatId only for the first message
      if (!firstMessageSent && chatId) {
        payload.chat_id = chatId;
        setFirstMessageSent(true);
      }

      await fetch("http://127.0.0.1:8000/api/store_chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to store query:", err);
    }
  };

  // Function to store only the bot response
  const storeChatAnswer = async (response: string) => {
    try {
      const payload = {
        bot_response: response,
        chat_id: chatId, // Required to know which chat this response belongs to
      };

      await fetch("http://127.0.0.1:8000/api/store_chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Failed to store response:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = { type: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);

    // Store only the user query
    await storeChatQuery(inputValue);

    try {
      const response = await sendQueryToBackend(inputValue, databaseName || "");

      const botMessage = {
        type: "bot",
        text: response.response,
      };
      setMessages((prev) => [...prev, botMessage]);

      // Store only the bot response
      await storeChatAnswer(response.response);
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInputValue("");
  };

  const handleShowCanvas = (data: any) => {
    setCanvasData(data);
    setIsCanvasOpen(true);
  };

  return (
    <div className="flex h-screen flex-col bg-white">
      <h1 className="mt-4 text-center text-2xl font-bold">
        Database Name : {databaseName}
      </h1>

      {messages.length === 0 && (
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="mb-6 text-5xl font-bold">Chat With Data</h1>
          <p className="text-gray">
            Ask your question, and I'll provide the best solution!
          </p>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto bg-white p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`ml-40 mr-60 p-3 ${
                msg.type === "user"
                  ? "max-w-[50%] rounded-2xl bg-lightgray text-black shadow-md"
                  : "max-w-[60%] rounded-3xl bg-lightgray font-semibold text-black shadow-md"
              }`}
            >
              <ReactMarkdown>{msg.text}</ReactMarkdown>

              {msg.type === "bot" && msg.data && (
                <button
                  onClick={() => handleShowCanvas(msg.data)}
                  className="hover:bg-green-600 mt-2 block rounded bg-green px-3 py-1 text-white"
                >
                  Show in Canvas
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="input mb-4 flex w-full items-center justify-center">
        <div className="buttonsvg flex w-[50vw]">
          <input
            className="w-full rounded-xl border-2 border-black bg-lightgray p-4"
            placeholder="Send a Message"
            type="text"
            name="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="rounded-xl border-2 border-black pl-2 pr-2 hover:opacity-70"
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
  );
}
