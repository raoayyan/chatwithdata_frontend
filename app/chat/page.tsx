"use client";

import { useRouter } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();

  const handleNewChat = () => {
    const newChatId = Date.now().toString(); // Generate a unique ID
    router.push(`/chat/${newChatId}`);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-lightgray">
      <h1 className="mb-6 text-5xl font-bold">Chat With Data</h1>
      <p className="mb-4 text-gray">Start a new chat to ask your questions!</p>
      <button
        onClick={handleNewChat}
        className="bg-blue-500 hover:bg-blue-600 rounded px-6 py-2 text-white"
      >
        New Chat
      </button>
    </div>
  );
}
