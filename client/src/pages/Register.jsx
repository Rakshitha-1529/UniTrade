import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: "",

    department: "",

    year: "",

    semester: ""

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    // ---------- EMAIL VALIDATION ----------

    const emailRegex = /@pvpsit\.ac\.in$/i;

    if (!emailRegex.test(formData.email)) {

      alert(

        "Please use your PVPSIT email.\n\nExample:\n23501A4233@pvpsit.ac.in"

      );

      return;

    }


    // ---------- PASSWORD VALIDATION ----------

    const passwordRegex =

      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(formData.password)) {

      alert(

        "Password must contain:\n\n" +

        "• Minimum 8 characters\n" +

        "• 1 uppercase letter\n" +

        "• 1 lowercase letter\n" +

        "• 1 number\n" +

        "• 1 special character"

      );

      return;

    }


    try {

      const response = await fetch(

        "http://localhost:5000/api/auth/register",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(formData)

        }

      );

      const data = await response.json();

      alert(data.message);

      if (response.ok) {

        navigate("/login");

      }

    }

    catch (error) {

      console.log(error);

      alert("Cannot connect to server");

    }

  };


  return (

    <div className="auth-container">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>


        <input

          type="text"

          name="name"

          placeholder="Full Name"

          value={formData.name}

          onChange={handleChange}

          required

        />


        <input

          type="email"

          name="email"

          placeholder="College Email"

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


        <select

          name="department"

          value={formData.department}

          onChange={handleChange}

          required

        >

          <option value="">Select Department</option>

          <option value="CSE">CSE</option>

          <option value="CSE-AIML">CSE-AIML</option>

          <option value="ECE">ECE</option>

          <option value="EEE">EEE</option>

          <option value="MECH">MECH</option>

          <option value="CIVIL">CIVIL</option>

          <option value="IT">IT</option>

        </select>


        <select

          name="year"

          value={formData.year}

          onChange={handleChange}

          required

        >

          <option value="">Select Year</option>

          <option value="1">I Year</option>

          <option value="2">II Year</option>

          <option value="3">III Year</option>

          <option value="4">IV Year</option>

        </select>


        <select

          name="semester"

          value={formData.semester}

          onChange={handleChange}

          required

        >

          <option value="">Select Semester</option>

          <option value="1">Semester 1</option>

          <option value="2">Semester 2</option>

        </select>


        <button type="submit">

          Register

        </button>

      </form>

    </div>

  );

}

export default Register;