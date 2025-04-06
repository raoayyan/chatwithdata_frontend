"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { faker } from "@faker-js/faker";
import dynamic from "next/dynamic";

// const CanvasComponent = dynamic(
//   () => import("@/components/ChatLayout/CanvasComponent"),
//   {
//     ssr: false,
//   }
// );

export default function ChatPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<
    Array<{ type: string; text: string; data?: any }>
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [canvasData, setCanvasData] = useState(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const databaseName = localStorage.getItem("databaseName");

  // Function to send query to the backend
  const sendQueryToBackend = async (query, databaseName) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat_with_database/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_query: query, database_name: databaseName }),
      });

      if (!response.ok) {
        throw new Error("Failed to send query");
      }

      const data = await response.json();
      return data; // Return the response data
    } catch (error) {
      console.error("Error sending query:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = { type: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await sendQueryToBackend(inputValue, databaseName);

      const botMessage = {
        type: "bot",
        text: response.response, // Assuming the backend returns a "message" field
      };
      setMessages((prev) => [...prev, botMessage]);
      console.log("Response from backend:", response.response);
      
    } catch (error) {
      // Add error message if the query fails
      const botMessage = {
        type: "bot",
        text: "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, botMessage]);
    }

    // Clear the input field
    setInputValue("");
  };
  
  // Handle opening the canvas with data
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
              className={`ml-5 mr-5 p-3 ${
                msg.type === "user"
                  ? "max-w-[50%] rounded-2xl bg-lightgray text-black shadow-md"
                  : "max-w-[90%] bg-white text-black"
              } `}
            >
              <p>{msg.text}</p>

              {/* Show in Canvas Button */}
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
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
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

      {/* Canvas Sidebar */}
      {/* <CanvasComponent
        data={canvasData}
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
      /> */}
    </div>
  );
}
