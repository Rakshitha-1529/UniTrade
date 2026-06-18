import { useState, useEffect } from "react";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [resources, setResources] = useState([]);

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
      .catch((err) => console.log(err));
  }, []);

  const myUploads = resources.filter(
  (resource) => {
    
    const uploaderId = resource.uploadedBy?._id || resource.uploadedBy;
    return uploaderId === user?._id;
  }
) || [];

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/resources/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setResources(
        resources.filter((resource) => resource._id !== id)
      );
    } catch (err) {
      console.log(err);
      alert("Failed to delete resource");
    }
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>

      <div className="profile-card">
        <h2 className="section-title">Personal Information</h2>

        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>

          <p>
            <strong>Department:</strong> {user?.department}
          </p>

          <p>
            <strong>Year:</strong> {user?.year}
          </p>

          <p>
            <strong>Semester:</strong> {user?.semester}
          </p>
        </div>
      </div>

      <h2 className="section-title">
        My Uploads ({myUploads.length})
      </h2>

      {myUploads.length === 0 ? (
        <p className="no-uploads">No uploads yet.</p>
      ) : (
        <div className="uploads-container">
          {myUploads.map((resource) => (
            <div
              key={resource._id}
              className="upload-card"
            >
              <h3>{resource.title}</h3>

              <p>
                <strong>Subject:</strong> {resource.subject}
              </p>

              <p>
                <strong>Category:</strong> {resource.category}
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
                />
              ) : (
                <div className="pdf-preview">
                  📄 PDF Document
                </div>
              )}

              <button
                className="delete-btn"
                onClick={() => handleDelete(resource._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Profile;