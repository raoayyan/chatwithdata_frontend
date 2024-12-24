import { ReactNode } from "react";
import Sidebar from "@/components/ChatLayout/Sidebar";

interface ChatLayoutProps {
  children: ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <div className="h-screen w-1/5 overflow-y-auto">
        <Sidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ChatLayout;
