import React, { useState, useEffect } from "react";
import "../assets/Visualizer.css";

function Visualizer({ algorithm, data }) {
    const [visualData, setVisualData] = useState([...data]);
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      setVisualData([...data]); // Update visual data when data prop changes
    }, [data]);
  
    const runAlgorithm = async () => {
      if (isRunning) return; // Prevent multiple runs
      setIsRunning(true);
      console.log("Algorithm Started");
  
      const generator = algorithm([...visualData]); // Create generator instance
      for (const step of generator) {
        const bars = document.querySelectorAll(".bar");
  
        if (step.type === "active") {
          const [i, j] = step.indices;
          highlightBars(bars, [i, j], "active");
          await sleep(300); // Delay for visualization
          clearHighlights(bars, [i, j], "active");
        } else if (step.type === "swap") {
          const [i, j] = step.indices;
          highlightBars(bars, [i, j], "swap");
          await sleep(300); // Delay for visualization
          setVisualData((prevData) => {
            const newData = [...prevData];
            [newData[i], newData[j]] = [newData[j], newData[i]]; // Swap in state
            return newData;
          });
          clearHighlights(bars, [i, j], "swap");
        }
      }
  
      setIsRunning(false); // Enable button again
    };
  
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    const highlightBars = (bars, indices, className) => {
      indices.forEach((index) => {
        bars[index]?.classList.add(className);
      });
    };
  
    const clearHighlights = (bars, indices, className) => {
      indices.forEach((index) => {
        bars[index]?.classList.remove(className);
      });
    };
  
    return (
      <div>
        <div className="visualizer-container">
          {visualData.map((value, index) => (
            <div
              key={index}
              className="bar"
              style={{ height: `${value}px`, width: `${100 / visualData.length}%` }}
            ></div>
          ))}
        </div>
        <button onClick={runAlgorithm}  disabled={isRunning}>
          {isRunning ? "Running..." : "Visualize"}
        </button>
      </div>
    );
  }
  

export default Visualizer;
