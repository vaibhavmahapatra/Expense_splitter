import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Balance() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/balances/net")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  const net = data.net;

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Net Balances
        </h2>

        <div className="bg-white p-6 rounded shadow mb-6 text-center">
          {net === 0 && (
            <p className="text-green-600 text-xl font-bold">
               You are fully settled
            </p>
          )}

          {net > 0 && (
            <p className="text-green-600 text-xl font-bold">
              You get back ₹{net.toFixed(2)}
            </p>
          )}

          {net < 0 && (
            <p className="text-red-500 text-xl font-bold">
              You owe ₹{Math.abs(net).toFixed(2)}
            </p>
          )}
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-6">
          <p>Total you owe: ₹{data.totalOwe.toFixed(2)}</p>
          <p>Total you get: ₹{data.totalGet.toFixed(2)}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-red-500">
            You owe
          </h3>

          {data.youOwe.length === 0 && (
            <p className="text-gray-500">You owe nothing 🎉</p>
          )}

          {data.youOwe.map((b, i) => (
            <div
              key={i}
              className="flex justify-between bg-white p-3 mb-2 rounded shadow"
            >
              <p>{b.user.name}</p>
              <p className="font-semibold text-red-500">
                ₹{b.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-green-600">
            You get back
          </h3>

          {data.youGet.length === 0 && (
            <p className="text-gray-500">No one owes you</p>
          )}

          {data.youGet.map((b, i) => (
            <div
              key={i}
              className="flex justify-between bg-white p-3 mb-2 rounded shadow"
            >
              <p>{b.user.name}</p>
              <p className="font-semibold text-green-600">
                ₹{b.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
