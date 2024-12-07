"use client";
import React, { useState, useRef, useEffect } from "react";

const AIChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    // Simulated AI response (replace with actual AI logic)
    const aiResponse = {
      id: messages.length + 2,
      text: `You said: "${inputMessage}". How else can I assist you?`,
      sender: "ai",
    };

    setMessages([...messages, newUserMessage, aiResponse]);
    setInputMessage("");
  };

  return (
    <div className="container mx-auto mt-20 max-w-4xl px-4 py-4">
      <div className="overflow-hidden rounded-lg border border-gray bg-white shadow-lg">
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-green p-4 text-white">
          <h2 className="text-lg font-bold">Chat Interface</h2>
        </div>

        {/* Messages Container */}
        <div className="h-[calc(100vh-300px)] space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-green text-white"
                    : "border border-gray bg-white text-dark"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex items-center border-t border-gray bg-lightgray p-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-grow rounded-l-lg border border-gray p-2 focus:outline-none focus:ring-1 focus:ring-green"
          />
          <button
            onClick={handleSendMessage}
            hidden={!inputMessage.trim()}
            className="rounded-r-lg bg-green p-2 text-white transition-colors hover:cursor-pointer hover:bg-green"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatInterface;
