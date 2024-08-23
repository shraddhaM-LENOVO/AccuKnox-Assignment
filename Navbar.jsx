import React from "react";
import { BiSolidBellRing } from "react-icons/bi";

const Navbar = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-500">{`>`}</span>
        <span className=" text-blue-900 font-bold">Dashboard V2</span>
      </div>
      <div className="ml-auto mx-96">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search anything..."
          className="w-full bg-blue-100 mr-40 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
        />
      </div>

      <div className="flex items-center space-x-4">
        <BiSolidBellRing className="text-blue-200 text-2xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;