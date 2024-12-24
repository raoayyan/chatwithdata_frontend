"use client";
import { useRouter } from "next/navigation";

export default function NewChat() {
  const router = useRouter();

  const handleNewChat = async () => {
    const chatId = Date.now().toString(); // Generate a unique ID for the chat
    router.push(`/chat/${chatId}`); // Navigate to the new chat URL
  };

  return (
    <div>
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
    </div>
  );
}
