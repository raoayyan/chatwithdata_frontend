"use client";

import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect, Text } from "react-konva";
import { X } from "lucide-react";

const CanvasComponent = ({ data, isOpen, onClose }) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  const cellWidth = 200;
  const cellHeight = 40;

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Canvas */}
      <div
        className={`border-gray-700 fixed right-0 top-0 z-50 flex h-full w-[70%] flex-col border-l bg-dark shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-primary p-4 text-white">
          <h2 className="text-xl font-semibold">Employee Table</h2>
          <button
            onClick={onClose}
            className="bg-gray-700 hover:bg-gray-600 rounded-full p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Canvas Container */}
        <div className="mt-10 flex flex-1 items-center justify-center bg-dark">
          {tableData.length > 0 ? (
            <Stage
              width={window.innerWidth * 0.65}
              height={window.innerHeight * 0.9}
              className="bg-gray-700 rounded-lg shadow-md"
            >
              <Layer>
                {/* Table Headers */}
                {["ID", "Name", "Position", "Department"].map(
                  (header, index) => (
                    <React.Fragment key={index}>
                      <Rect
                        x={index * cellWidth}
                        y={0}
                        width={cellWidth}
                        height={cellHeight}
                        fill="#4A6CF7" // Primary color from tailwind.config.js
                        cornerRadius={[8, 8, 0, 0]} // Rounded top corners
                      />
                      <Text
                        text={header}
                        x={index * cellWidth + 10}
                        y={10}
                        fill="white"
                        fontSize={16}
                        fontStyle="bold"
                      />
                    </React.Fragment>
                  )
                )}

                {/* Table Rows */}
                {tableData.map((row, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <React.Fragment key={colIndex}>
                        <Rect
                          x={colIndex * cellWidth}
                          y={(rowIndex + 1) * cellHeight}
                          width={cellWidth}
                          height={cellHeight}
                          fill={rowIndex % 2 === 0 ? "#555" : "#666"} // Alternating row colors
                        />
                        <Text
                          text={value}
                          x={colIndex * cellWidth + 10}
                          y={(rowIndex + 1) * cellHeight + 10}
                          fill="white"
                          fontSize={14}
                        />
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </Layer>
            </Stage>
          ) : (
            <p className="text-lg text-white">No content available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CanvasComponent;
