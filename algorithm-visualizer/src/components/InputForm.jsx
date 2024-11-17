import React, { useState } from "react";

function InputForm({ onSubmit }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const parsedInput = input.split(",").map((num) => parseInt(num, 10));
        if (parsedInput.some(isNaN)) {
            alert("Invalid input. Please enter numbers separated by commas.");
        } else {
            onSubmit(parsedInput);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter numbers separated by commas"
            />
            <button type="submit">Visualize</button>
        </form>
    );
}

export default InputForm;
