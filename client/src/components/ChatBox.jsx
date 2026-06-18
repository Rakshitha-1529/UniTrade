import React, { useState } from "react";
import "./ChatBox.css";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { text: input, sender: "me" },
    ]);

    setInput("");
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        Chat
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.sender === "me"
                ? "message-row me"
                : "message-row other"
            }
          >
            <span className="message-bubble">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          className="chat-input"
          placeholder="Type a message..."
        />

        <button
          onClick={sendMessage}
          className="chat-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;