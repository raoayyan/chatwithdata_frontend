"use client";
import { useState } from "react";

export default function GetStarted() {
  const sqlDatabases = ["MySQL", "PostgreSQL", "SQLite"];
  const noSqlDatabases = ["MongoDB", "Firebase", "Cassandra"];

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
    <div className="bg-gray-100 relative min-h-screen p-6 pt-28">
      <h1 className="mb-2 text-center text-4xl font-bold text-green">
        Manage Your Databases
      </h1>
      <p className="text-md mb-8 text-center text-gray">
        Easily manage your SQL and NoSQL databases from here.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* SQL Databases */}
        <div className="rounded-lg bg-lightgray p-6 shadow-xl">
          <h2 className="mb-4 text-center text-2xl font-extrabold">
            SQL Databases
          </h2>
          <ul className="mb-4 space-y-4">
            {sqlDatabases.map((db, index) => (
              <li key={index} className="rounded-md bg-lightgray p-4 shadow-lg">
                <div className="flex flex-row justify-between space-x-4">
                  <h3 className="pt-4 text-lg font-bold">{db}</h3>
                  <div className="mt-2 flex space-x-4">
                    <button className="rounded-md border-2 border-green bg-white py-2 px-4 font-semibold text-black hover:bg-green">
                      Start Chat
                    </button>
                    <button
                      className="rounded-md border-2 border-green bg-white py-2 px-4 font-semibold text-black hover:bg-green"
                      onClick={() => handleExplanationClick(db)}
                    >
                      Explanation
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-10 w-full rounded-md bg-green py-2 font-semibold text-white hover:bg-opacity-90">
            Add New SQL Database
          </button>
        </div>

        <div className="rounded-lg bg-lightgray p-6 shadow-xl">
          <h2 className="mb-4 text-center text-2xl font-extrabold">
            NoSQL Databases
          </h2>
          <ul className="mb-4 space-y-4">
            {noSqlDatabases.map((db, index) => (
              <li key={index} className="rounded-md bg-lightgray p-4 shadow-lg">
                <div className="flex flex-row justify-between space-x-4">
                  <h3 className="pt-4 text-lg font-bold">{db}</h3>
                  <div className="mt-2 flex space-x-4">
                    <button className="rounded-md border-2 border-green bg-white py-2 px-4 font-semibold text-black hover:bg-green">
                      Start Chat
                    </button>
                    <button
                      className="rounded-md border-2 border-green bg-white py-2 px-4 font-semibold text-black hover:bg-green"
                      onClick={() => handleExplanationClick(db)}
                    >
                      Explanation
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button className="mt-10 w-full rounded-md bg-green py-2 font-semibold text-white hover:bg-opacity-90">
            Add New NoSQL Database
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative flex h-[80%] w-[80%] flex-col rounded-lg bg-white p-6 shadow-lg">
            <button
              className="text-gray-500 absolute top-4 right-4 text-2xl hover:text-black"
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
  );
}
