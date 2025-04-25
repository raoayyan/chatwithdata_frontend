"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/ChatLayout/Sidebar";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex h-screen w-full">
      <Sidebar isOpen={isSidebarOpen} setIsOpenAction={setIsSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "md:ml-[250px]" : "ml-0"
        }`}
      >
        <div className="h-full w-full overflow-hidden">{children}</div>
      </div>
    </div>
  );
};

export default ChatLayout;
