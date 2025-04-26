"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import {
  Send,
  Database,
  Copy,
  MessageSquare,
  Trash2,
  Loader2,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Message {
  type: string;
  text: string;
  data?: any;
  timestamp?: Date;
}

interface ChatSession {
  id: string;
  preview: string;
  created_at: Date;
}

export default function ChatPage() {
  const router = useRouter();
  const { chatId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [canvasData, setCanvasData] = useState(null);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [sampleQuestions, setSampleQuestions] = useState<string[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const databaseName =
    typeof window !== "undefined" ? localStorage.getItem("databaseName") : "";

  const databaseType =
    typeof window !== "undefined" ? localStorage.getItem("databaseType") : "";

  useEffect(() => {
    const fetchSampleQuestions = async () => {
      try {
        // Fetch sample questions on page load
        if (databaseName === "MonitoringSystem") {
          setSampleQuestions([
            "give me the details of healthy server whose memory usage is less thatn 50",
            "is there is any error where SSL handshake failed",
            "give me all completed payments",
            "which user Accessed Admin Panel?",
          ]);
        } else if (databaseName === "sample") {
          setSampleQuestions([
            "give me the detials of Jennifer Whalen dependents",
            "Give me all employee that belong to IT department",
            "what is maximum salary of employee Bruce Ernst",
            "Give me all employee that belong to Administration department",
          ]);
        } else if (databaseName === "perls") {
          setSampleQuestions([
            "Give me names of all customers whose total amount is less than 30",
            "Which customer bought the most items",
            "Which store have Product  F ?",
            "what is the price of Product B?",
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch sample questions:", error);
        // Fallback sample questions if API fails
        setSampleQuestions([
         ""
        ]);
      }
    };

    fetchSampleQuestions();
  }, []);

  // Fetch chat sessions
  useEffect(() => {
    const fetchSessions = async () => {
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
          const chatSessions = data.chats.map((chat: any) => ({
            id: chat.chat_id,
            preview: chat.queries[0] || "New Chat",
            created_at: new Date(chat.created_at || Date.now()),
          }));
          setSessions(chatSessions);
        }
      } catch (err) {
        console.error("Failed to fetch chat sessions:", err);
      }
    };

    if (databaseName) {
      fetchSessions();
    }
  }, [databaseName]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = window.innerHeight * 0.25;
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [inputValue]);

  const sendQueryToBackend = async (query: string, dbName: string) => {
    const response = await fetch(
      "http://127.0.0.1:8000/api/chat_with_database/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_query: query,
          database_name: dbName,
          databaseType: databaseType,
        }),
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
          if (!Array.isArray(data.chats)) {
            console.error(
              "Expected 'data.chats' to be an array, but got:",
              data.chats
            );
            return;
          }

          const chats = data.chats.find((chat: any) => chat.chat_id === chatId);
          if (chats) {
            const chatMessages = [];
            for (let i = 0; i < chats.queries.length; i++) {
              chatMessages.push({
                type: "user",
                text: chats.queries[i],
                timestamp: new Date(),
              });
              chatMessages.push({
                type: "bot",
                text: chats.responses[i],
                timestamp: new Date(),
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
    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue;
    const newMessage = {
      type: "user",
      text: userInput,
      timestamp: new Date(),
    };

    // Clear input immediately
    setInputValue("");
    setIsLoading(true);

    // Add user message to chat
    setMessages((prev) => [...prev, newMessage]);

    // Clear sample questions when first message is sent
    if (sampleQuestions.length > 0) {
      setSampleQuestions([]);
    }

    await storeChatQuery(userInput);

    try {
      // For demo purposes, simulate a response if API fails
      let response;
      try {
        response = await sendQueryToBackend(userInput, databaseName || "");
      } catch (error) {
        console.error("API call failed, using mock response");
        response = {
          response: `This is a mock response to: "${userInput}". The API is currently not available.`,
          data: null,
        };
      }

      const botMessage = {
        type: "bot",
        text: response.response,
        data: response.data || null,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      await storeChatAnswer(response.response);

      // Update sessions after new message
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
          if (!Array.isArray(data.chats)) {
            console.error(
              "Expected 'data.chats' to be an array, but got:",
              data.chats
            );
            return;
          }

          const chatSessions = data.chats.map((chat: any) => ({
            id: chat.chat_id,
            preview: chat.queries?.[0] || "New Chat",
            created_at: new Date(chat.created_at || Date.now()),
          }));

          setSessions(chatSessions);
        }
      } catch (err) {
        console.error("Failed to update sessions:", err);
      }
    } catch (error) {
      const errorMessage = {
        type: "bot",
        text: "Sorry, something went wrong. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowCanvas = (data: any) => {
    setCanvasData(data);
    setIsCanvasOpen(true);
  };

  const handleSampleQuestionClick = (question: string) => {
    setInputValue(question);
    handleSendMessage();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 relative flex h-screen w-full flex-col overflow-visible">
      <header className="dark:bg-gray-800 bg-white p-4 ">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-gray-800 flex items-center gap-2 text-2xl font-bold dark:text-white">
            <Database className="h-6 w-6 text-emerald-600" />
            <span>Chat with {databaseName || "Database"}</span>
          </h1>
        </div>
      </header>

      <ScrollArea className="flex-1 overflow-y-auto px-4 pt-4 md:px-8">
        <div className="mx-auto max-w-3xl space-y-8 py-8">
          {messages.length === 0 && sampleQuestions.length > 0 ? (
            <div className="flex h-[calc(100vh-16rem)] items-center justify-center">
              <div className="space-y-6 text-center">
                <h2 className="text-gray-800 text-4xl font-bold dark:text-white">
                  Chat With Data
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  You can try asking questions like:
                </p>
                <div className="grid max-w-2xl gap-3 md:grid-cols-2">
                  {sampleQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      className="border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg border bg-white p-4 text-left shadow-sm transition-all hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-md dark:hover:bg-emerald-900/20"
                      onClick={() => handleSampleQuestionClick(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8 py-8">
              <AnimatePresence>
                {messages.map((msg, index) => {
                  const isUserMessage = msg.type === "user";
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        "group flex gap-4",
                        isUserMessage ? "justify-end" : "justify-start"
                      )}
                    >
                      <div className="flex max-w-[85%] flex-col gap-2 lg:max-w-[75%]">
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-3",
                            isUserMessage
                              ? "bg-emerald-500 text-white"
                              : "dark:bg-gray-800 bg-gray text-white shadow-sm"
                          )}
                        >
                          <div className="prose prose-sm max-w-none text-white dark:prose-invert">
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                          </div>

                          {msg.type === "bot" && msg.data && (
                            <Button
                              onClick={() => handleShowCanvas(msg.data)}
                              className="mt-3 bg-emerald-700 text-white hover:bg-emerald-800"
                              size="sm"
                            >
                              Show in Canvas
                            </Button>
                          )}

                          {msg.timestamp && (
                            <div className="mt-2 text-xs opacity-70">
                              {format(new Date(msg.timestamp), "h:mm a")}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn(
                            "h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100",
                            isUserMessage ? "ml-auto" : "mr-auto"
                          )}
                          onClick={() => copyToClipboard(msg.text)}
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy message</span>
                        </Button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {isLoading && (
                <div className="flex justify-start">
                  <div className="dark:bg-gray-800 max-w-[75%] rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex space-x-2">
                      <div className="bg-gray-400 h-2 w-2 animate-bounce rounded-full"></div>
                      <div
                        className="bg-gray-400 h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="bg-gray-400 h-2 w-2 animate-bounce rounded-full"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Field */}
      <div className="dark:bg-gray-800 bg-white p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="border-gray-200 dark:border-gray-600 dark:bg-gray-700 relative overflow-hidden rounded-lg border bg-white"
          >
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Type your question here..."
              className="text-gray-800 w-full resize-none border-0 bg-transparent px-4 pb-12 pt-3 focus:outline-none focus:ring-0 dark:text-white"
              disabled={isLoading}
              rows={1}
              style={{
                minHeight: "60px",
                maxHeight: "25vh",
                overflowY: "auto",
              }}
            />
            <div className="dark:bg-gray-700 absolute bottom-0 left-0 right-0 flex h-12 items-center justify-between bg-white px-3">
              <div className="text-gray-500 dark:text-gray-400 text-xs">
                Press Enter to send, Shift+Enter for new line
              </div>
              <Button
                type="submit"
                size="icon"
                className="h-8 w-8 rounded-full bg-emerald-600 text-white hover:bg-emerald-700"
                disabled={isLoading || !inputValue.trim()}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
