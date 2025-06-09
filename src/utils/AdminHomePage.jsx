import React from "react";


import { Link } from "react-router-dom";
import AnalyticsDashboard from "../components/AnalyticsDashboard";
import AdminLayout from "./AdminLayout";


const AdminHomePage = () => {
 

  // const orders = [
  //   {
  //     _id: 123332,
  //     user: {
  //       name: "John Doe",
  //     },
  //     totalPrice: 110,
  //     status: "Processing",
  //   },
  // ];
  return (
 <div>

  <AnalyticsDashboard/>
 </div>
  );
};

export default AdminHomePage;
