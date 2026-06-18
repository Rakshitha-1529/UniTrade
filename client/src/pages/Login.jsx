import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";
import { AuthContext } from "../context/AuthContext";

function Login() {
const navigate = useNavigate();
const { login } = useContext(AuthContext);

const [formData, setFormData] = useState({
email: "",
password: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

const emailRegex = /@pvpsit\.ac\.in$/i;
if (!emailRegex.test(formData.email)) {
alert("Please use your PVPSIT email");
return;
}

try {
const res = await fetch("http://localhost:5000/api/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
credentials: "include",
body: JSON.stringify(formData)
});

const data = await res.json();

if (res.status === 404) {
alert("User not registered");
return;
}

if (res.status === 401) {
alert("Invalid password");
return;
}

if (res.ok) {
await login(); // fetch user from /me inside context
alert("Login Successful");
navigate("/");
}
} catch (error) {
console.log(error);
alert("Cannot connect to server");
}
};

return (
<div className="auth-container">
<h2>Login</h2>

<form onSubmit={handleSubmit}>
<input type="email" name="email" placeholder="PVPSIT Email" value={formData.email} onChange={handleChange} required />
<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
<button type="submit">Login</button>
</form>

<p style={{ marginTop: "15px" }}>
Don't have an account? <Link to="/register">Register</Link>
</p>
</div>
);
}

export default Login;