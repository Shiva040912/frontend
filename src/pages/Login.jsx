import { useState } from "react";
import axios from "axios";
import "./auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {
  // 🚀 லோக்கல் ஸ்டோரேஜ்ல ஏற்கனவே ஈமெயில் இருந்தா அதை ஆரம்பத்திலேயே எடுத்து செட் பண்றோம் bro
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 🚀 லோக்கல் லிங்க் மாற்றப்பட்டு லைவ் லிங்க் சேர்க்கப்பட்டுள்ளது
      const res = await axios.post(
        "https://auth-api-dnbf.onrender.com/auth/login",
        {
          email,
          password,
        },
      );

      if (res.data.message === "Login Success") {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("email", email);

        alert("Login Success");
        navigate("/projects");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email} // 🚀 இந்த வரியை சேர்த்தா தான் பழைய ஈமெயில் பாக்ஸ்ல தானா வந்து நிக்கும்!
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Login
          </button>

          <Link to="/" className="auth-link">
            <button className="link-btn" type="button">
              Go To Register
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

// fresh trigger comment: storage autofill added successfully