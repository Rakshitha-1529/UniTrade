import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadResource() {

    const navigate = useNavigate();

    const [resource, setResource] = useState({
        title: "",
        subject: "",
        category: ""
    });

    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        setResource({
            ...resource,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const reader = new FileReader();

        reader.onload = () => {

            const uploadedResource = {
                id: Date.now(),
                ...resource,
                fileName: selectedFile.name,
                fileType: selectedFile.type,
                fileData: reader.result,
                uploadedBy:
                    JSON.parse(
                        localStorage.getItem("user")
                    )?.name
            };

            const existingResources =
                JSON.parse(
                    localStorage.getItem("resources")
                ) || [];

            existingResources.push(
                uploadedResource
            );

            localStorage.setItem(
                "resources",
                JSON.stringify(existingResources)
            );
        };

        reader.readAsDataURL(selectedFile);

        setFile(selectedFile);
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        alert("Resource Uploaded Successfully");

        navigate("/");
    };

    return (
      
        <div className="upload-container">
        <center>
            <h2>Upload Resource</h2>

            <form onSubmit={handleSubmit}>
            
                <input
                    type="text"
                    name="title"
                    placeholder="Resource Title"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    onChange={handleChange}
                    required
                />

                <select
                    name="category"
                    onChange={handleChange}
                    required
                >
                    <option value="">
                        Select Category
                    </option>

                    <option value="Notes">
                        Notes
                    </option>

                    <option value="Book">
                        Book
                    </option>

                    <option value="Assignment">
                        Assignment
                    </option>

                    <option value="Question Paper">
                        Question Paper
                    </option>

                </select>

                <input
                    type="file"
                    accept=".pdf,image/*"
                    onChange={handleFileChange}
                    required
                />

                <button type="submit">
                    Upload
                </button>

            </form>

        </center></div>
    );
}

export default UploadResource;