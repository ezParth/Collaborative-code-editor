import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const recentProjects = [
  { id: 1, name: "Team App Rewrite", timestamp: "April 21, 2025" },
  { id: 2, name: "Socket.IO Playground", timestamp: "April 19, 2025" },
  { id: 3, name: "React+Monaco Setup", timestamp: "April 15, 2025" },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/editor");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6 flex flex-col items-center justify-center space-y-10">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#7C00FE] via-[#F5004F] to-[#F9E400] text-transparent bg-clip-text mb-4">
          Welcome to CodeSync
        </h1>
        <p className="text-lg text-gray-400 max-w-xl mx-auto">
          Collaborate, code, and create in real-time. Jump back into your latest project or start something new.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-[#1E293B] p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Recent Projects</h2>
          <ul className="space-y-3">
            {recentProjects.map((project) => (
              <li key={project.id} className="bg-[#334155] px-4 py-3 rounded-xl flex justify-between items-center hover:bg-[#475569] transition">
                <span>{project.name}</span>
                <span className="text-sm text-gray-400">{project.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRedirect}
        className="bg-[#7C00FE] hover:bg-purple-700 transition-all px-8 py-3 rounded-full text-lg font-bold shadow-lg"
      >
        🚀 Launch Editor
      </motion.button>
    </div>
  );
};

export default Dashboard;
