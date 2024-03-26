import React from "react";

const Banner = ({ text }) => {
  return (
    <div>
      <div className="md:h-64 h-52 relative flex items-center justify-center mt-20">
        <img
          src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full object-cover md:h-64 md:w-full lg:w-full lg:h-full h-52"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center">
          <div className="md:h-24 h-16 bg-black bg-opacity-50 md:w-96 w-72 text-white text-center uppercase font-bold md:text-3xl text-xl flex items-center justify-center">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
