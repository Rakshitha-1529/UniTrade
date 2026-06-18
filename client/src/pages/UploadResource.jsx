import "../styles/upload.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function UploadResource() {
const navigate = useNavigate();
const { user } = useContext(AuthContext);

const [resource, setResource] = useState({
title: "",
subject: "",
category: ""
});

const [file, setFile] = useState(null);
const [preview, setPreview] = useState(null);

const handleChange = (e) => {
setResource({
...resource,
[e.target.name]: e.target.value
});
};

const handleFileChange = (e) => {
const selectedFile = e.target.files[0];
if (!selectedFile) return;

if (selectedFile.size > 10 * 1024 * 1024) {
alert("File must be below 10 MB");
return;
}

if (!selectedFile.type.startsWith("image/") && selectedFile.type !== "application/pdf") {
alert("Only images and PDF allowed");
return;
}

setFile(selectedFile);

if (selectedFile.type.startsWith("image")) {
setPreview(URL.createObjectURL(selectedFile));
} else {
setPreview(null);
}
};

const handleSubmit = async (e) => {
e.preventDefault();

if (!user) {
alert("Please login");
navigate("/login");
return;
}

if (!file) {
alert("Select file");
return;
}

const formData = new FormData();
formData.append("title", resource.title);
formData.append("subject", resource.subject);
formData.append("category", resource.category);
formData.append("file", file);

try {
const response = await fetch("http://localhost:5000/api/resources", {
method: "POST",
credentials: "include",
body: formData
});

const data = await response.json();

if (response.ok) {
alert("Uploaded successfully");
navigate("/");
} else {
alert(data.message);
}
} catch (error) {
console.log(error);
alert("Upload failed");
}
};

return (
<div className="upload-container">
<h2>Upload Resource</h2>

<form onSubmit={handleSubmit}>
<input type="text" name="title" placeholder="Resource Title" onChange={handleChange} required />
<input type="text" name="subject" placeholder="Subject" onChange={handleChange} required />

<select name="category" onChange={handleChange} required>
<option value="">Select Category</option>
<option value="Notes">Notes</option>
<option value="Book">Book</option>
<option value="Question Paper">Question Paper</option>
</select>

<input type="file" accept="image/*,.pdf" onChange={handleFileChange} required />

{preview && <img src={preview} className="upload-preview" alt="preview" />}

<button type="submit">Upload</button>
</form>
</div>
);
}

export default UploadResource;