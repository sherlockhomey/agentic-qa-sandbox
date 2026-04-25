"use client";
import { useState } from "react";

export default function SandboxPage() { 
    const [message, setMessage] = useState("Initial State");

    return (
        <div style={{ padding: "20px" }}>
            <h1 id="status-heading">Agentic QA Sandbox: Walk Phase Active</h1>
            <button 
                id="blue-button"
                data-testid="sandbox-action-btn" //NEW: Stable locator 
                onClick={() => setMessage("Action Performed")}
                style={{ border: "1px solid border-black", padding: "10px", background: "#f0f0f0" }}
            >
                Click Me
            </button>
            <p id="display-message" data-testid="sandbox-msg-display" style={{ marginTop: "10px", fontWeight: "bold" }}>{message}</p>
        </div>
    ); 
}