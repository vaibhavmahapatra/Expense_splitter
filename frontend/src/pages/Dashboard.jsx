import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/groups")
      .then(res => setGroups(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Groups</h2>
          <Link to="/create-group" className="btn">
            + Create Group
          </Link>
        </div>

        {loading && <p>Loading groups...</p>}

        {!loading && groups.length === 0 && (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <p className="text-lg font-semibold mb-2">
              You have no groups yet
            </p>
            <p className="text-gray-500 mb-4">
              Create a group to start splitting expenses
            </p>
            <Link to="/create-group" className="btn">
              Create Your First Group
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {groups.map(group => (
            <Link
              key={group._id}
              to={`/group/${group._id}`}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <p className="text-sm text-gray-500">
                {group.members.length} members
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
