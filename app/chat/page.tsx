"use client";
import { useSearchParams } from "next/navigation";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const databaseName = searchParams.get("database");
  localStorage.setItem("databaseName", databaseName);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-lightgray">
      {databaseName ? (
        <h1 className="mb-6 text-5xl font-bold">Chat With {databaseName}</h1>
      ) : (
        <h1 className="mb-6 text-5xl font-bold">Chat With Data</h1>
      )}
      <p className="mb-4 text-gray">Start a new chat to ask your questions!</p>
    </div>
  );
}
