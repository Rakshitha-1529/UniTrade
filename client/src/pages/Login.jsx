import { useState } from "react";

import { useNavigate, Link }

from "react-router-dom";

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


  const handleSubmit = async (e) => {

    e.preventDefault();


    // Email validation

    const emailRegex = /@pvpsit\.ac\.in$/i;


    if (

      !emailRegex.test(

        formData.email

      )

    ) {

      alert(

`Please use your PVPSIT email.

Example:

23501A4233@pvpsit.ac.in`

      );

      return;

    }


    try {

      const response = await fetch(

        "http://localhost:5000/api/auth/login",

        {

          method: "POST",

          headers: {

            "Content-Type":

            "application/json"

          },

          body: JSON.stringify({

            email:

            formData.email,

            password:

            formData.password

          })

        }

      );


      const data =

      await response.json();


      // User not found

      if (

        response.status === 404

      ) {

        alert(

          "User not registered"

        );

        return;

      }


      // Wrong password

      if (

        response.status === 401

      ) {

        alert(

          "Invalid password"

        );

        return;

      }


      // Success

      if (response.ok) {

        localStorage.setItem(

          "isLoggedIn",

          "true"

        );


        localStorage.setItem(

          "user",

          JSON.stringify(

            data.user

          )

        );


        alert(

          "Login Successful"

        );


        navigate("/");

      }

    }

    catch (error) {

      console.log(error);

      alert(

        "Cannot connect to server"

      );

    }

  };


  return (

    <div className="auth-container">

      <h2>

        Login

      </h2>


      <form

        onSubmit={handleSubmit}

      >

        <input

          type="email"

          name="email"

          placeholder="PVPSIT Email"

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


      <p

        style={{

          marginTop: "15px"

        }}

      >

        Don't have an account?{" "}

        <Link to="/register">

          Register

        </Link>

      </p>

    </div>

  );

}

export default Login;