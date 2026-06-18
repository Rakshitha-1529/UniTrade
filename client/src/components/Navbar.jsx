import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

function Navbar() {
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm, filter, setFilter } =
    useContext(SearchContext);

  const logout = async () => {
await fetch("http://localhost:5000/api/auth/logout", {
method: "POST",
credentials: "include"
});

navigate("/login");
};

  return (
    <nav className="navbar">
      {/* Logo Section */}

      <div className="logo-section">
        <img src={logo} alt="UniTrade Logo" className="logo" />

        <h2>UniTrade</h2>
      </div>

      {/* Search */}

      <div className="search-section">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>

          <option value="Notes">Notes</option>

          <option value="Book">Book</option>

          <option value="Assignment">Assignment</option>

          <option value="Question Paper">Question Paper</option>
        </select>
      </div>

      {/* Navigation */}

      <div className="nav-links">
        <Link to="/">Dashboard</Link>

        <Link to="/upload">Upload</Link>

        <Link to="/chat">Chat</Link>

        <Link to="/notifications">Notifications</Link>

        <Link to="/profile">Profile</Link>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
