import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";


export default function Group() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  useEffect(() => {
    api.get(`/expenses/group/${id}`)
      .then(res => setExpenses(res.data))
      .catch(err => console.error(err));
  }, [id]);

  async function deleteGroup() {
    if (!window.confirm("Delete this group?")) return;

    try {
      await api.delete(`/groups/${id}`);
      navigate("/");
    } catch (err) {
      alert("Failed to delete group");
    }
  }

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex gap-4 mb-6">
          <Link to={`/add-expense/${id}`} className="btn">
            Add Expense
          </Link>

          <button
            onClick={deleteGroup}
            className="btn bg-red-500 hover:bg-red-600"
          >
            Delete Group
          </button>
        </div>

        <div className="bg-white p-4 mb-6 rounded shadow">
  <h3 className="font-semibold mb-2">Add Member</h3>

  {message && (
    <p className="text-sm mb-2 text-red-500">{message}</p>
  )}

  <div className="flex gap-2">
    <input
      className="input flex-1"
      placeholder="Member email"
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
    <button
      className="btn"
      onClick={async () => {
        try {
          await api.post(`/groups/${id}/add-member`, { email });
          setEmail("");
          setMessage("Member added successfully");
        } catch (err) {
          setMessage(err.response?.data?.msg || "Failed to add member");
        }
      }}
    >
      Add
    </button>
  </div>
</div>


        {expenses.length === 0 && (
          <p className="text-gray-500">No expenses yet</p>
        )}

        {expenses.map(e => (
          <div key={e._id} className="bg-white p-4 mb-3 rounded shadow">
            <p className="font-semibold">{e.description}</p>
            <p>Amount: ₹{e.amount}</p>
            <p className="text-sm text-gray-600">
              Paid by: {e.paidBy?.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
