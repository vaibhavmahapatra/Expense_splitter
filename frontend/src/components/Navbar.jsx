import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Expense splitter
      </Link>
      <Link
        to="/balances"
        className="text-2xl text-orange-500 hover:text-green-600 font-bold"
      >
        Balances
      </Link>

      <button
        onClick={logout}
        className="text-red-500 font-semibold hover:underline"
      >
        Logout
      </button>

    </nav>
  );
}
