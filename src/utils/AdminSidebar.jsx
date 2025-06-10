import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaEdit,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";

import { Link, NavLink, useNavigate } from "react-router-dom";


const AdminSidebar = () => {
  const navigate = useNavigate();

 

  const handleLogout = () => {
   localStorage.clear()
    navigate("/");
  };
  return (
    <div>
      <div className="p-6 ">
        <div className="mb-6">
          <Link to="/admin" className="text-2xl font-medium">
            ExpertOnBoard
          </Link>
        </div>
        <h2 className="text-xl font-medium mb-6 text-center">
          Admin Dashboard
        </h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin/list"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
            }
          >
            <FaUser />
            <span>Users</span>
          </NavLink>
          <NavLink
            to="/admin/newEvent"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
            }
          >
            <FaEdit />
            <span>Events</span>
          </NavLink>
          <NavLink
            to="/admin/stat"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
            }
          >
            <FaBoxOpen />
            <span>Stats</span>
          </NavLink>
          <NavLink
            to="/admin/que"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
            }
          >
            <FaClipboardList />
            <span>QNA</span>
          </NavLink>
          <NavLink
            to="/admin/ytid"
            className={({ isActive }) =>
              isActive
                ? "bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4 rounded flex items-center space-x-2"
            }
          >
            <FaStore />
            <span>EventLink</span>
          </NavLink>
        </nav>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-gray-300 rounded py-2 px-4 hover:bg-red-600 
       w-full flex items-center justify-center space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
