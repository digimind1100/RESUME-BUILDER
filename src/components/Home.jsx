import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // optional if you want to use global styles

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to Smart Resume Builder</h1>
      <p className="text-lg mb-8 max-w-2xl">
        Create your professional resume in minutes. Use AI-powered suggestions for skills and experience.
      </p>
      <Link
        to="/resume"
        className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition"
      >
        Go to Resume Builder
      </Link>
    </div>
  );
};

export default Home;
