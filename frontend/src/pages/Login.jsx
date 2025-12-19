import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function submit() {
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input className="input" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="input mt-3" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button onClick={submit} className="btn mt-4">Login</button>

        <p className="text-sm mt-3">
          New user? <Link className="text-green-600" to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
