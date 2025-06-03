import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

const AnalyticsChart = () => {
  const [analyticsData, setAnalyticsData] = useState({
    today: 0,
    weekly: 0,
    monthly: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(
          "https://your-vercel-backend.vercel.app/api/analytics/stats"
        );
        setAnalyticsData(res.data);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      }
    };
    fetchAnalytics();
  }, []);

  const chartData = [
    { label: "Today", count: analyticsData.today },
    { label: "This Week", count: analyticsData.weekly },
    { label: "This Month", count: analyticsData.monthly },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-10 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-center mb-4">
        Website Visitors
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#4f46e5" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
