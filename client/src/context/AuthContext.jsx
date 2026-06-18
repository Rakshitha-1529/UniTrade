import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

// fetch logged-in user from backend cookie
useEffect(() => {
fetch("http://localhost:5000/api/auth/me", {
credentials: "include"
})
.then(res => res.json())
.then(data => {
if (!data.message) {
setUser(data);
} else {
setUser(null);
}
setLoading(false);
})
.catch(() => {
setUser(null);
setLoading(false);
});
}, []);

const login = async (email, password) => {
const res = await fetch("http://localhost:5000/api/auth/login", {
method: "GET",
credentials: "include",
headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ email, password })
});

const data = await res.json();

if (res.ok) {
setUser(data.user);
return { success: true };
}

return { success: false, message: data.message };
};

const logout = async () => {
await fetch("http://localhost:5000/api/auth/logout", {
method: "POST",
credentials: "include"
});

setUser(null);
};

return (
<AuthContext.Provider value={{ user, login, logout, loading }}>
{children}
</AuthContext.Provider>
);
};