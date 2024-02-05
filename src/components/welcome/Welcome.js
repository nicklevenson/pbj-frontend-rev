
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="absolute inset-0 bg-gray-200 bg-opacity-50 flex justify-center items-center">
      <div className="p-8 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Thanks for joining Peanut Butter & Jam!</h1>
        <p className="text-gray-700">
          We're excited to have you! To get started, we need to get some info from you to help us find the best matches for you.
        </p>

        <div className="mt-8">
          <Link to="/welcome/step1" className="bg-blue-500 text-white px-4 py-2 rounded">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;