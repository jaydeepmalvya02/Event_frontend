import React, { useEffect, useState } from "react";
import axios from "axios";

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://event-nine-xi.vercel.app/api/analytics/stats"
        ); // Your API URL
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border text-primary" role="status" />
        <span className="ms-2">Loading Analytics...</span>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="alert alert-danger">Failed to load analytics data.</div>
    );
  }

  // Destructure data from API response
  const { totalVisitors, deviceStats, visits, mostUsedDevice } = stats;

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-white">Website Analytics Dashboard</h1>

      <div className="row g-4 mb-5">
        {/* Total Visitors */}
        <div className="col-md-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Visitors</h5>
              <p className="display-4">{totalVisitors}</p>
            </div>
          </div>
        </div>

        {/* Today's Visitors */}
        <div className="col-md-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Today's Visitors</h5>
              <p className="display-4">{visits.today}</p>
            </div>
          </div>
        </div>

        {/* This Week's Visitors */}
        <div className="col-md-3">
          <div className="card text-white bg-info h-100">
            <div className="card-body">
              <h5 className="card-title">This Week</h5>
              <p className="display-4">{visits.thisWeek}</p>
            </div>
          </div>
        </div>

        {/* This Month's Visitors */}
        <div className="col-md-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">This Month</h5>
              <p className="display-4">{visits.thisMonth}</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-3 text-white ">Visitors by Device Type</h2>
      <p className="mb-3">
        <strong className="text-white">Most Used Device: </strong>{" "}
        {mostUsedDevice}
      </p>
      <div className="row g-3">
        {deviceStats.map((device) => (
          <div key={device._id} className="col-md-4">
            <div className="card border-secondary h-100">
              <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 text-capitalize">
                  {device._id || "Unknown"}
                </h5>
                <span className="badge bg-secondary fs-5">{device.count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
