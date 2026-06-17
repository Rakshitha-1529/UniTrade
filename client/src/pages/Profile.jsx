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

            </div>
    )
  }
export default Profile;