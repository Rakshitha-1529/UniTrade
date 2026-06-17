import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Login() {
    const navigate = useNavigate();
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
    const handleSubmit = (e) => {
        e.preventDefault();
        const savedUser =
            JSON.parse(
                localStorage.getItem("user")
            );
        if (!savedUser) {
            alert("Please Register First" );
            navigate("/register");
            return;
        }
        if ( savedUser.email === formData.email && savedUser.password === formData.password) {
            localStorage.setItem(  "isLoggedIn", "true");
            alert("Login Successful");
            navigate("/");
        }
        else {
            alert( "Invalid Email or Password");
        }
    };
    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;