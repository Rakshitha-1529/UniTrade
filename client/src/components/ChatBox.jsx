import React, { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "me" }]);
    setInput("");
  };

  return (
    <div className="w-80 bg-white shadow-lg rounded-xl flex flex-col">
      <div className="p-3 border-b font-semibold">Chat</div>

      <div className="flex-1 p-3 overflow-y-auto h-64">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${
              msg.sender === "me" ? "text-right" : "text-left"
            }`}
          >
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg inline-block">
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="p-2 border-t flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-2 py-1 mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-3 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;