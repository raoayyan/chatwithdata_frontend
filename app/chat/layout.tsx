"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/ChatLayout/Sidebar";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpenAction={setIsSidebarOpen} />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-[20%] w-[80%]" : "w-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default ChatLayout;
