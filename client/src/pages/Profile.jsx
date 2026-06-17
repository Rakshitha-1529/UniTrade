Profile.jsx
import { useState } from "react";
function Profile() {
    const user =JSON.parse(localStorage.getItem("user"));
    const [resources, setResources] = useState(JSON.parse(localStorage.getItem("resources")) || []);

    const myUploads =
        resources.filter(
            (resource) =>
                resource.uploadedBy === user?.name
        );

    const handleDelete = (id) => {

        const updatedResources =
            resources.filter(
                (resource) =>
                    resource.id !== id
            );

        setResources(updatedResources);

        localStorage.setItem(
            "resources",
            JSON.stringify(updatedResources)
        );
    };

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>Profile</h1>

            <hr />

            <p>
                <strong>Name:</strong>
                {" "}
                {user?.name}
            </p>

            <p>
                <strong>Email:</strong>
                {" "}
                {user?.email}
            </p>

            <p>
                <strong>Department:</strong>
                {" "}
                {user?.department}
            </p>

            <p>
                <strong>Year:</strong>
                {" "}
                {user?.year}
            </p>

            <p>
                <strong>Semester:</strong>
                {" "}
                {user?.semester}
            </p>

            <br />

            <h2>My Uploads</h2>

            <hr />

            {myUploads.length === 0 ? (

                <p>
                    You haven't uploaded any resources yet.
                </p>

            ) : (

                myUploads.map((resource) => (

                    <div
                        key={resource.id}
                        style={{
                            border: "1px solid #ddd",
                            padding: "15px",
                            marginBottom: "15px",
                            borderRadius: "10px"
                        }}
                    >

                        <h3>
                            {resource.title}
                        </h3>

                        <p>
                            Subject:
                            {" "}
                            {resource.subject}
                        </p>

                        <p>
                            Category:
                            {" "}
                            {resource.category}
                        </p>

                        <a
                            href={resource.fileData}
                            download={resource.fileName}
                        >
                            <button>
                                Download
                            </button>
                        </a>

                        <button
                            onClick={() =>
                                handleDelete(resource.id)
                            }
                            style={{
                                marginLeft: "10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}
                        >
                            Delete
                        </button>

                    </div>

                ))

            )}

        </div>
    );
}

export default Profile;