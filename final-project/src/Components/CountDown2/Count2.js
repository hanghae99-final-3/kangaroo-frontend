import React from "react";
import Clock2 from "./Clock2";
const Count2 = () => {
    const deadline = "2021-08-18 02:49:00 ";
    return (
        <div>
            <div>
                <h1>Countdown Timer</h1>
                <h2>{deadline}까지</h2>
                <Clock2 deadline={deadline} />
            </div>
        </div>
    );
};

export default Count2;