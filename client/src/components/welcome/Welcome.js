import React from "react";
import { Link } from "react-router-dom";
import Div100vh from "react-div-100vh";

const Welcome = () => {
  return (
    <Div100vh className="fixed overflow-y-scroll z-10 inset-0 bg-white flex flex-col">
      <div className="flex-1 bg-gradient-animation pt-12 flex justify-start items-end">
        <div className="inner-container flex-1">
          <h1 className="text-white flex flex-col">
            <span className="text-xl">Thanks for joining</span>
            <span className="font-bold text-2xl">Peanut Butter & Jam!</span>
          </h1>
        </div>
      </div>
      <div className="flex-1">
        <div className="inner-container">
          <p>
            We're excited to have you! To get started, we need to get some info
            from you to help us find the best matches for you.
          </p>

          <div className="mt-8">
            <Link
              to="/welcome/step1"
              className="bg-blue-500 text-white px-5 py-5 rounded-full"
            >
              <span className="font-semibold text-base">Get Started</span>
            </Link>
          </div>
        </div>
      </div>
    </Div100vh>
  );
};

export default Welcome;
