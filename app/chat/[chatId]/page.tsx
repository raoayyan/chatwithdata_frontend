"use client";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, inputValue]);
      setInputValue(""); // Clear the input field after submitting
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-screen flex-col bg-lightgray">
      <h1 className="mt-4 text-center text-2xl font-bold">Chat ID: {chatId}</h1>
      {messages.length === 0 && (
        <div className="flex flex-grow flex-col items-center justify-center">
          <h1 className="mb-6 text-5xl font-bold">Chat With Data</h1>
          <p className="text-gray">
            Ask your question, and I'll provide the best solution!
          </p>
        </div>
      )}

      <div className="flex-grow overflow-y-auto bg-lightgray p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-blue-100 mb-2 self-start rounded px-4 py-2 text-black"
          >
            {message}
          </div>
        ))}
      </div>

      <div className="input mb-4 flex w-full items-center justify-center">
        <div className="buttonsvg flex w-[50vw]">
          <input
            className="w-full rounded-xl border-2 border-black bg-lightgray p-4"
            placeholder="Send a Message"
            type="text"
            name="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
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
  );
}
