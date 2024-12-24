"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

export default function GetStarted() {
  const databases = [
    { name: "MySQL", type: "SQL" },
    { name: "PostgreSQL", type: "SQL" },
    { name: "SQLite", type: "SQL" },
    { name: "MongoDB", type: "NoSQL" },
    { name: "Firebase", type: "NoSQL" },
    { name: "Cassandra", type: "NoSQL" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState("");

  const handleExplanationClick = (dbName) => {
    setSelectedDatabase(dbName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 relative mb-16 min-h-screen p-6 pt-28">
        <h1 className="mb-2 text-center text-4xl font-bold text-green">
          Manage Your Databases
        </h1>
        <p className="text-md mb-8 text-center text-gray">
          Easily manage your SQL and NoSQL databases from here.
        </p>

        <div className="from-gray-100 via-gray-200 to-gray-300 rounded-lg bg-gradient-to-br p-6 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
          <ul className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {databases.map((db, index) => (
              <li
                key={index}
                className="relative overflow-hidden rounded-lg bg-white shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_6px_15px_rgba(0,0,0,0.2)] dark:!bg-green dark:!bg-opacity-10"
              >
                {/* Accent Border */}
                <div
                  className={`absolute left-0 top-0 h-full w-2 ${
                    db.type === "SQL" ? "bg-blue-500" : "bg-yellow-500"
                  }`}
                ></div>
                <div className="flex h-full flex-col justify-between p-4">
                  {/* Database Info */}
                  <div>
                    <h3 className="text-gray-800 mb-2 text-xl font-bold">
                      {db.name}{" "}
                      <span
                        className={`ml-2 rounded-full px-3 py-1 text-sm font-semibold ${
                          db.type === "SQL"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {db.type}
                      </span>
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Manage and explore the features of {db.name}, a{" "}
                      {db.type.toLowerCase()} database.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex space-x-3">
                    <Link
                      href="/chat"
                      className="flex-1 rounded-md border-2 border-green px-4 py-2 text-center text-sm font-semibold text-black transition-all hover:bg-green hover:text-white dark:text-white"
                    >
                      Start Chat
                    </Link>
                    <button
                      className="flex-1 rounded-md border-2 border-green px-4 py-2 text-sm font-semibold text-black transition-all hover:bg-green hover:text-white dark:text-white"
                      onClick={() => handleExplanationClick(db.name)}
                    >
                      Explanation
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-10 w-full rounded-md bg-green bg-gradient-to-r py-2 text-lg font-semibold text-white shadow-[0_6px_12px_rgba(0,0,0,0.15)] transition-all hover:from-green">
            Add New Database
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative flex h-[80%] w-[80%] flex-col rounded-lg bg-white p-6 shadow-lg">
              <button
                className="text-gray-500 absolute right-4 top-4 text-2xl hover:text-black"
                onClick={closeModal}
              >
                &times;
              </button>

              <h2 className="mb-6 text-center text-3xl font-bold text-green">
                {selectedDatabase} Explanation
              </h2>

              <div className="flex flex-1 space-x-6">
                <div className="w-1/2 rounded-md bg-lightgray p-4 shadow-md">
                  <h3 className="mb-4 text-xl font-semibold text-green">
                    Database Schema
                  </h3>
                  <p className="text-gray-700">
                    This section shows the schema for the {selectedDatabase}{" "}
                    database. For example:
                    <ul className="mt-2 list-inside list-disc">
                      <li>Table: Users</li>
                      <li>Columns: ID, Name, Email</li>
                      <li>Relations: One-to-Many</li>
                    </ul>
                  </p>
                </div>

                <div className="w-1/2 rounded-md bg-lightgray p-4 shadow-md">
                  <h3 className="mb-4 text-xl font-semibold text-green">
                    Explanation
                  </h3>
                  <p className="text-gray-700">
                    {selectedDatabase} is widely used in modern applications. It
                    supports advanced features such as indexing, queries, and
                    scalability. Learn more about its key features and how to
                    utilize them in development.
                  </p>
                </div>
              </div>
              <button
                className="mt-6 w-full rounded-md bg-green py-2 font-semibold text-white hover:bg-opacity-90"
                onClick={() => setIsModalOpen(false)}
              >
                Edit Database
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
