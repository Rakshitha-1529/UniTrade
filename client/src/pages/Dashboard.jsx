import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import "../styles/dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);

  const { searchTerm = "", filter = "All" } =
    useContext(SearchContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/me",{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/resources",{
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setResources(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredResources = resources.filter(
    (resource) => {
      const matchesSearch = resource.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        resource.category === filter;

      return matchesSearch && matchesFilter;
    }
  );

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{resources.length}</h2>
          <p>Resources</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              resources.filter(
                (r) => r.category === "Book"
              ).length
            }
          </h2>
          <p>Books</p>
        </div>

        <div className="stat-card">
          <h2>
            {
              resources.filter(
                (r) => r.category === "Notes"
              ).length
            }
          </h2>
          <p>Notes</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Notifications</p>
        </div>
      </div>

      <h2>Recently Uploaded Resources</h2>

      {filteredResources.length === 0 ? (
        <p>No resources uploaded yet.</p>
      ) : (
        <div className="resource-grid">
          {filteredResources.map((resource) => {
            console.log(
              "Image URL:",
              `http://localhost:5000/${resource.filePath?.replace(
                /^\/+/,
                ""
              )}`
            );

            return (
              <div
                key={resource._id}
                className="resource-card"
              >
                <h3>{resource.title}</h3>

                <p>
                  <strong>Subject:</strong>{" "}
                  {resource.subject}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {resource.category}
                </p>

                <p>
                  <strong>Uploaded By:</strong>{" "}
                  {resource.uploadedBy?.name}
                </p>

                <p>
                  <strong>Downloads:</strong>{" "}
                  {resource.downloads}
                </p>

                {resource.filePath?.match(
                  /\.(jpg|jpeg|png|webp|gif)$/i
                ) ? (
                  <img
                    src={`http://localhost:5000/${resource.filePath.replace(
                      /^\/+/,
                      ""
                    )}`}
                    alt={resource.title}
                    className="book-cover"
                    onError={(e) => {
                      console.log(
                        "Failed URL:",
                        e.target.src
                      );
                      e.target.src =
                        "https://via.placeholder.com/200x250?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="pdf-preview">
                    <div className="pdf-icon">
                      📄
                    </div>
                    <p>PDF Document</p>
                  </div>
                )}

                {resource.category === "Book" ? (
                  <button
                    className="request-btn"
                    onClick={() =>
                      alert(
                        `Request sent for ${resource.title}`
                      )
                    }
                  >
                    Make Request
                  </button>
                ) : (
                  <button
                    className="download-btn"
                    onClick={async () => {
                      try {
                        await fetch(
                          `http://localhost:5000/api/resources/download/${resource._id}`,
                          {
                            method: "PUT",
                          }
                        );

                        const link =
                          document.createElement(
                            "a"
                          );

                        link.href = `http://localhost:5000/${resource.filePath.replace(
                          /^\/+/,
                          ""
                        )}`;

                        link.download =
                          resource.fileName ||
                          resource.title;

                        document.body.appendChild(
                          link
                        );
                        link.click();
                        document.body.removeChild(
                          link
                        );
                      } catch (error) {
                        console.log(error);
                        alert(
                          "Download failed"
                        );
                      }
                    }}
                  >
                    Download Notes
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;