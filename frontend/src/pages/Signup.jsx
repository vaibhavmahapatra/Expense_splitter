import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit() {
    await api.post("/auth/signup", { name, email, password });
    navigate("/login");
  }

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 w-96 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>

        <input className="input" placeholder="Name"
          onChange={(e) => setName(e.target.value)} />

        <input className="input mt-3" placeholder="Email"
          onChange={(e) => setEmail(e.target.value)} />

        <input type="password" className="input mt-3" placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} />

        <button onClick={submit} className="btn mt-4">Signup</button>

        <p className="text-sm mt-3">
          Already have an account? <Link className="text-green-600" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
