// Implement a Counter component with two buttons:
// “Increase” and “Decrease”, which displays the current counter value.
import React, { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div style={{ textAlign: "center", fontSize: "20px" }}>
            <h2>Counter: {count}</h2>
            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
                Decrease
            </button>
        </div>
    );
}

export default Counter;
