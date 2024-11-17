import React, { useState, useEffect } from "react";
import "./Visualizer.css";

function Visualizer({ algorithm, data }) {
    const [array, setArray] = useState([...data]);
    const [currentStep, setCurrentStep] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [steps, setSteps] = useState([]);

    useEffect(() => {
        const gen = algorithm([...data]);
        const newSteps = [];
        for (let step of gen) newSteps.push(step);
        setSteps(newSteps);
    }, [algorithm, data]);

    const runVisualization = async () => {
        setIsRunning(true);
        for (let i = 0; i < steps.length; i++) {
            setCurrentStep(steps[i]);
            if (steps[i].type === "swap") {
                const [i1, i2] = steps[i].indices;
                const newArr = [...array];
                [newArr[i1], newArr[i2]] = [newArr[i2], newArr[i1]];
                setArray(newArr);
            }
            await new Promise((resolve) => setTimeout(resolve, 500)); // Speed control
        }
        setIsRunning(false);
    };

    return (
        <div>
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        key={idx}
                        className={`array-bar ${
                            currentStep?.indices?.includes(idx) ? "active" : ""
                        }`}
                        style={{ height: `${value}px` }}
                    />
                ))}
            </div>
            <button onClick={runVisualization} disabled={isRunning}>
                {isRunning ? "Running..." : "Run"}
            </button>
        </div>
    );
}

export default Visualizer;
