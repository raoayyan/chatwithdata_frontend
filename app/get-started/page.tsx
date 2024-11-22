"use client";
import { useState } from "react";

export default function GetStarted() {
  const sqlDatabases = ["MySQL", "PostgreSQL", "SQLite"];
  const noSqlDatabases = ["MongoDB", "Firebase", "Cassandra"];

  // State for modal visibility and content
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // Handler to open modal with database explanation
  const handleExplanationClick = (dbName) => {
    const explanations = {
      MySQL: "MySQL is an open-source relational database management system.",
      PostgreSQL:
        "PostgreSQL is a powerful, open-source object-relational database.",
      SQLite: "SQLite is a lightweight, serverless SQL database engine.",
      MongoDB:
        "MongoDB is a document-oriented NoSQL database used for high volume data storage.",
      Firebase:
        "Firebase is a platform developed by Google for creating mobile and web applications.",
      Cassandra:
        "Cassandra is a distributed NoSQL database designed for handling large amounts of data across many servers.",
    };
    setModalContent(explanations[dbName]);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 pt-28">
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

        {/* NoSQL Databases */}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-green">
              Database Explanation
            </h2>
            <p className="text-gray-700 mb-6">{modalContent}</p>
            <button
              className="w-full rounded-md bg-green py-2 font-semibold text-white hover:bg-opacity-90"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
