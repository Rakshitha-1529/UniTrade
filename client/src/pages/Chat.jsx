import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Chat() {
const [chats, setChats] = useState([]);
const [message, setMessage] = useState("");
const { user } = useContext(AuthContext);

const requestId = "123"; // replace with real requestId later

const loadChats = () => {
fetch(`http://localhost:5000/api/chat/${requestId}`, {
credentials: "include"
})
.then(res => res.json())
.then(data => setChats(data))
.catch(err => console.log(err));
};

useEffect(() => {
loadChats();
}, []);

const sendMessage = async () => {
if (!message.trim()) return;

try {
await fetch("http://localhost:5000/api/chat/send", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
credentials: "include",
body: JSON.stringify({
requestId,
message
})
});

setMessage("");
loadChats();
} catch (error) {
console.log(error);
}
};

return (
<div style={{ padding: "30px" }}>
<h1>UniTrade Chat</h1>

<div style={{ border: "1px solid #ccc", height: "400px", overflowY: "auto", padding: "20px", marginBottom: "20px" }}>
{chats.map(chat => (
<div key={chat._id} style={{ marginBottom: "15px" }}>
<strong>{chat.senderId}</strong>
<p>{chat.message}</p>
<small>{new Date(chat.createdAt).toLocaleString()}</small>
</div>
))}
</div>

<input
type="text"
placeholder="Type message..."
value={message}
onChange={(e) => setMessage(e.target.value)}
style={{ width: "80%", padding: "10px" }}
/>

<button onClick={sendMessage} style={{ padding: "10px" }}>
Send
</button>
</div>
);
}

export default Chat;