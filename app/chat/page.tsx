"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function ChatContent() {
  const searchParams = useSearchParams();
  const databaseName = searchParams.get("database");
  const databaseType = searchParams.get("type");

  // Safely set localStorage only when component is mounted
  useEffect(() => {
    if (databaseName) {
      localStorage.setItem("databaseName", databaseName);
    }
    if (databaseType) {
      localStorage.setItem("databaseType", databaseType);
    }
  }, [databaseName, databaseType]);

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

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading Chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}
