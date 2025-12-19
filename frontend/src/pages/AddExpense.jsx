import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const userId = JSON.parse(
    atob(localStorage.getItem("token").split(".")[1])
  ).id;

  async function submit() {
    if (!amount) return;

    await api.post("/expenses", {
      groupId: id,
      amount: Number(amount),
      description: desc,
      paidBy: userId,
    });

    navigate(`/group/${id}`);
  }

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>

        <input
          className="input"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="number"
          className="input mt-3"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={submit} className="btn mt-4 w-full">
          Add Expense
        </button>
      </div>
    </>
  );
}
