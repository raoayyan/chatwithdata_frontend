"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { c } from "framer-motion/dist/types.d-6pKw1mTI";

export default function GetStarted() {
  const [databases, setDatabases] = useState([
    { name: "MySQL", type: "SQL" },
    { name: "PostgreSQL", type: "SQL" },
    { name: "SQLite", type: "SQL" },
    { name: "MongoDB", type: "NoSQL" },
    { name: "Firebase", type: "NoSQL" },
    { name: "Cassandra", type: "NoSQL" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDatabase, setSelectedDatabase] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDatabase, setNewDatabase] = useState({
    db_name: "",
    db_uri: "",
    type: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/databases/");
        if (!response.ok) {
          throw new Error("Failed to fetch databases");
        }
        const data = await response.json();
        const databases = data.databases.map((db) => ({
          name: db.db_name,
          type: "NOSQL", // or dynamically assign if available
        }));
        setDatabases(databases);
        // setDatabases(data);
        console.log("Fetched databases:", data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDatabases();
  }, []);

  const saveDatabaseToBackend = async (database) => {
    try {
      let apiUrl;
      if (database.type === "SQL") {
        apiUrl = "https://127.000.001/api/save-sql-database";
      } else if (database.type === "NoSQL") {
        apiUrl = "http://127.0.0.1:8000/api/add-database/";
      } else {
        throw new Error("Invalid database type");
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(database),
      });

      if (!response.ok) {
        throw new Error("Failed to save database");
      }

      const data = await response.json();
      return data; // Return the response data if needed
    } catch (error) {
      console.error("Error saving database:", error);
      throw error;
    }
  };

  const handleSaveNewDatabase = async () => {
    if (newDatabase.db_name && newDatabase.db_uri && newDatabase.type) {
      try {
        await saveDatabaseToBackend(newDatabase);
        setDatabases([...databases, { name: newDatabase.db_name, type: newDatabase.type }]);

        setNewDatabase({ db_name: "", db_uri: "", type: "" });
        setIsAddModalOpen(false);
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to save the database. Please try again.");
      }
    } else {
      alert("Please fill out all fields.");
    }
  };

  const handleExplanationClick = (dbName) => {
    setSelectedDatabase(dbName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddDatabase = () => {
    setIsAddModalOpen(true);
  };

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray100 p-4 pt-24 dark:bg-dark">
        <Header />
        <div className="text-center">
          <p className="text-lg text-green dark:text-green">
            Loading databases...
          </p>
        </div>
      </div>
    );
  }

  // Render error state
  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-gray100 p-4 pt-24 dark:bg-dark">
  //       <Header />
  //       <div className="text-center">
  //         <p className="text-red-500 dark:text-red-400 text-lg">
  //           Error: {error}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray100 p-4 pt-24 dark:bg-dark">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-green dark:text-green">
            Manage Your Databases
          </h1>
          <p className="text-sm text-gray800 dark:text-body-color">
            Effortlessly manage and interact with your SQL and NoSQL databases.
          </p>
        </div>

        {/* Database Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {databases.map((db, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:border dark:border-gray800 dark:bg-dark dark:shadow-2xl"
              >
                {/* Accent Bar */}
                <div
                  className={`h-1.5 ${
                    db.type === "SQL" ? "bg-primary" : "bg-yellow"
                  }`}
                ></div>

                {/* Card Content */}
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      {db.name}
                    </h3>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        db.type === "SQL"
                          ? "bg-blue-100 text-primary"
                          : "bg-yellow-100 text-yellow"
                      }`}
                    >
                      {db.type}
                    </span>
                  </div>
                  <p className="mb-4 text-sm text-gray800 dark:text-body-color">
                    Manage and explore the features of {db.name}, a{" "}
                    {db.type.toLowerCase()} database.
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={{
                        pathname: "/chat",
                        query: { database: db.name },
                      }}
                      className="flex-1 rounded-md bg-green px-3 py-1.5 text-center text-sm text-white transition-all hover:bg-opacity-90"
                    >
                      Start Chat
                    </Link>
                    <button
                      className="flex-1 rounded-md border border-green bg-transparent px-3 py-1.5 text-center text-sm text-green transition-all hover:bg-green hover:text-white"
                      onClick={() => handleExplanationClick(db.name)}
                    >
                      Explanation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Database Button */}
          <button
            className="mx-auto mt-8 flex w-full max-w-sm items-center justify-center gap-2 rounded-md bg-green px-4 py-2 text-sm text-white transition-all hover:bg-opacity-90"
            onClick={handleAddDatabase}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Database
          </button>
        </div>

        {/* Explanation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 max-w-2xl rounded-lg bg-white p-6 dark:bg-dark">
              <button
                className="absolute right-2 top-2 text-xl text-gray800 hover:text-black dark:text-body-color dark:hover:text-white"
                onClick={closeModal}
              >
                &times;
              </button>

              <h2 className="mb-4 text-2xl font-bold text-green dark:text-green">
                {selectedDatabase} Explanation
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-lightgray p-4 dark:bg-gray800">
                  <h3 className="mb-2 text-lg font-semibold text-green dark:text-green">
                    Database Schema
                  </h3>
                  <p className="text-sm text-gray800 dark:text-body-color">
                    This section shows the schema for the {selectedDatabase}{" "}
                    database. For example:
                    <ul className="mt-1 list-inside list-disc">
                      <li>Table: Users</li>
                      <li>Columns: ID, Name, Email</li>
                      <li>Relations: One-to-Many</li>
                    </ul>
                  </p>
                </div>

                <div className="rounded-lg bg-lightgray p-4 dark:bg-gray800">
                  <h3 className="mb-2 text-lg font-semibold text-green dark:text-green">
                    Explanation
                  </h3>
                  <p className="text-sm text-gray800 dark:text-body-color">
                    {selectedDatabase} is widely used in modern applications. It
                    supports advanced features such as indexing, queries, and
                    scalability. Learn more about its key features and how to
                    utilize them in development.
                  </p>
                </div>
              </div>

              <button
                className="mt-4 w-full rounded-md bg-green px-4 py-2 text-sm text-white transition-all hover:bg-opacity-90"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Add Database Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative min-h-[45%] w-11/12 max-w-md rounded-lg bg-white p-6 dark:bg-dark">
              <button
                className="absolute right-4 top-2 text-xl text-gray800 hover:text-black dark:text-body-color dark:hover:text-white"
                onClick={() => setIsAddModalOpen(false)}
              >
                &times;
              </button>

              <h2 className="mb-4 text-2xl font-bold text-green dark:text-green">
                Add New Database
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Database Name"
                  className="w-full rounded-md border border-gray200 bg-transparent px-3 py-2 text-sm text-black dark:border-gray800 dark:text-white"
                  value={newDatabase.db_name}
                  onChange={(e) =>
                    setNewDatabase({ ...newDatabase, db_name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Database URI"
                  className="w-full rounded-md border border-gray200 bg-transparent px-3 py-2 text-sm text-black dark:border-gray800 dark:text-white"
                  value={newDatabase.db_uri}
                  onChange={(e) =>
                    setNewDatabase({
                      ...newDatabase,
                      db_uri: e.target.value,
                    })
                  }
                />
                <select
                  className="w-full rounded-md border border-gray200 bg-transparent px-3 py-2 text-sm text-black dark:border-gray800 dark:text-white"
                  value={newDatabase.type}
                  onChange={(e) =>
                    setNewDatabase({ ...newDatabase, type: e.target.value })
                  }
                >
                  <option value="">Select Type</option>
                  <option value="SQL">SQL</option>
                  <option value="NoSQL">NoSQL</option>
                </select>
              </div>

              <button
                className="mt-4 w-full rounded-md bg-green px-4 py-2 text-sm text-white transition-all hover:bg-opacity-90"
                onClick={handleSaveNewDatabase}
              >
                Save Database
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
