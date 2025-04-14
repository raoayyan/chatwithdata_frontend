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
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]); // 🆕 NEW STATE
  const databaseName =
    typeof window !== "undefined" ? localStorage.getItem("databaseName") : "";

  // 🆕 Fetch sample questions on page load
  useEffect(() => {
    const fetchSampleQuestions = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/sample-questions/");
        const data = await res.json();
        if (data.sample_questions) {
          setSampleQuestions(data.sample_questions);
        }
      } catch (error) {
        console.error("Failed to fetch sample questions:", error);
      }
    };

    fetchSampleQuestions();
  }, []);

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

  const storeChatQuery = async (query: string) => {
    try {
      const payload: any = {
        query: query,
        db_name: databaseName,
      };

      if (chatId) {
        payload.db_name = databaseName;
        payload.chat_id = chatId;
      }

      await fetch("http://127.0.0.1:8000/api/store-chat/", {
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

  const storeChatAnswer = async (response: string) => {
    try {
      const payload = {
        response: response,
        chat_id: chatId,
      };

      await fetch("http://127.0.0.1:8000/api/store-chat/", {
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

  useEffect(() => {
    const fetchPreviousChats = async () => {
      if (!chatId || !databaseName) return;

      try {
        const res = await fetch(`http://127.0.0.1:8000/api/get-chat/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            db_name: databaseName,
          }),
        });
        const data = await res.json();

        if (data.message === "Chats retrieved successfully!") {
          const chats = data.chats.find((chat: any) => chat.chat_id === chatId);

          if (chats) {
            const chatMessages = [];
            for (let i = 0; i < chats.queries.length; i++) {
              chatMessages.push({
                type: "user",
                text: chats.queries[i],
              });
              chatMessages.push({
                type: "bot",
                text: chats.responses[i],
              });
            }
            setMessages(chatMessages);
          }
        }
      } catch (err) {
        console.error("Failed to fetch chat history:", err);
      }
    };

    fetchPreviousChats();
  }, [chatId, databaseName]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = { type: "user", text: inputValue };
    setMessages((prev) => [...prev, newMessage]);

    // Clear sample questions when first message is sent
    if (sampleQuestions.length > 0) {
      setSampleQuestions([]);
    }

    await storeChatQuery(inputValue);

    try {
      const response = await sendQueryToBackend(inputValue, databaseName || "");

      const botMessage = {
        type: "bot",
        text: response.response,
      };
      setMessages((prev) => [...prev, botMessage]);

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

      {/* Sample Questions Section - Show only if no messages yet */}
      {messages.length === 0 && sampleQuestions.length > 0 && (
        <div className="flex flex-grow flex-col items-center justify-center p-4 text-center">
          <h1 className="mb-6 text-5xl font-bold">Chat With Data</h1>
          <p className="text-gray-600 mb-4 text-lg">
            You can try asking questions like:
          </p>
          <ul className="space-y-2">
            {sampleQuestions.map((q, idx) => (
              <li
                key={idx}
                className="hover:bg-gray-200 cursor-pointer rounded bg-lightgray px-4 py-2"
                onClick={() => {
                  setInputValue(q);
                  handleSendMessage();
                }}
              >
                {q}
              </li>
            ))}
          </ul>
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
                  ? "max-w-[50%] rounded-2xl bg-customgray text-black shadow-md"
                  : "max-w-[60%] rounded-2xl bg-customgray font-semibold text-black shadow-md"
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
      <div className="mb-2 flex w-full items-center justify-center">
        <div className="relative w-full max-w-2xl rounded-2xl">
          <textarea
            rows={4}
            className="w-full resize-none rounded-xl border-2 border-gray bg-white p-3 pr-12 text-sm text-black outline-none"
            placeholder="Type your question here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // prevent newline
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all hover:bg-dark"
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
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
