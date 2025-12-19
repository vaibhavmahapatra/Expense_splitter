import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import AddExpense from "./pages/AddExpense";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./context/AuthContext";
import CreateGroup from "./pages/CreateGroup";
import Balance from "./pages/Balance";


export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/group/:id" element={<ProtectedRoute><Group /></ProtectedRoute>} />
          <Route path="/add-expense/:id" element={<ProtectedRoute><AddExpense /></ProtectedRoute>} />
          <Route path="/create-group" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>}/>
          <Route path="/balances" element={<ProtectedRoute><Balance /></ProtectedRoute>}/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
