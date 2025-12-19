import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function CreateGroup() {
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");
  const navigate = useNavigate();

  async function submit() {
    if (!name.trim()) return;

    const memberEmails = emails
      .split(",")
      .map(e => e.trim())
      .filter(Boolean);

    await api.post("/groups", {
      name,
      memberEmails
    });

    navigate("/");
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Group</h2>

        <input
          className="input mb-3"
          placeholder="Group name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <textarea
          className="input h-24"
          placeholder="Add member emails (comma separated)"
          value={emails}
          onChange={e => setEmails(e.target.value)}
        />

        <button onClick={submit} className="btn mt-4 w-full">
          Create Group
        </button>
      </div>
    </>
  );
}
