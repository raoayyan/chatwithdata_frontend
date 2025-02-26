"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { faker } from "@faker-js/faker";
import dynamic from "next/dynamic";

const CanvasComponent = dynamic(
  () => import("@/components/ChatLayout/CanvasComponent"),
  {
    ssr: false,
  }
);

export default function ChatPage() {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<
    Array<{ type: string; text: string; data?: any }>
  >([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [canvasData, setCanvasData] = useState(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  // Generate mock employee data
  const generateEmployees = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      position: faker.person.jobTitle(),
      department: faker.commerce.department(),
    }));
  };

  // Handle user input
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message to chat
    const newMessage = { type: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);

    // Check if the input matches the "generate employees" pattern
    if (inputValue.match(/generate (\d+) rows of employee/i)) {
      const count = parseInt(inputValue.match(/\d+/)[0], 10);
      const employees = generateEmployees(count);

      // Add bot message with mock data
      const botMessage = {
        type: "bot",
        text: `Generated ${count} employees.`,
        data: employees,
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      // Add default bot message
      const botMessage = {
        type: "bot",
        text: "Sorry, I didn't understand. Try 'Generate 5 rows of employee'.",
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

      {/* Chat Messages */}
      <div className="flex-grow overflow-y-auto bg-lightgray p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`ml-5 mr-5 max-w-[70%] rounded-lg p-3 ${
                msg.type === "user"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              } shadow-md`}
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
      <CanvasComponent
        data={canvasData}
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
      />
    </div>
  );
}
