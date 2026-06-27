import { useState } from "react";
import axios from "axios";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // 🚀 லோக்கல் லிங்க் மாற்றப்பட்டு லைவ் லிங்க் சேர்க்கப்பட்டுள்ளது
      const res = await axios.post(
        "https://auth-api-dnbf.onrender.com/auth/register",
        {
          name,
          email,
          password,
        },
      );

      alert("Registered Successfully");
      console.log(res.data);

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Register</h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Register
          </button>

          <Link to="/login" className="auth-link">
            <button className="link-btn" type="button">
              Go To Login
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;

// test change for vercel build
