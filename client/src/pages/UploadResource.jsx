import "../styles/upload.css";

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

    if (!selectedFile)

      return;


    // 10 MB limit

    if (

      selectedFile.size >

      10 * 1024 * 1024

    ) {

      alert(

        "File must be below 10 MB"

      );

      return;

    }


    setFile(selectedFile);

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    const user = JSON.parse(

      localStorage.getItem(

        "user"

      )

    );


    if (!user) {

      alert(

        "Please login"

      );

      navigate("/login");

      return;

    }


    if (!file) {

      alert(

        "Please select a file"

      );

      return;

    }


    try {

      const formData = new FormData();


      formData.append(

        "title",

        resource.title

      );


      formData.append(

        "subject",

        resource.subject

      );


      formData.append(

        "category",

        resource.category

      );


      formData.append(

        "uploadedBy",

        user.name

      );


      formData.append(

        "file",

        file

      );


      const response = await fetch(

        "http://localhost:5000/api/resources",

        {

          method: "POST",

          body: formData

        }

      );


      const data =

      await response.json();


      if (response.ok) {

        alert(

          data.message

        );

        navigate("/");

      }

      else {

        alert(

          data.message

        );

      }

    }

    catch (error) {

      console.log(error);

      alert(

        "Upload failed"

      );

    }

  };


  return (

    <div className="upload-container">

      <h2>

        Upload Resource

      </h2>


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

            Books

          </option>

          <option value="Question Paper">

            Question Papers

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

    </div>

  );

}

export default UploadResource;