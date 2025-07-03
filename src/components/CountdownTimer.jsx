import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [status, setStatus] = useState("upcoming"); // 'upcoming' | 'live' | 'completed'
  const [timeLeft, setTimeLeft] = useState(null);

  // Parse the ISO datetime string (already in UTC) into Date object
  const parseTargetDate = (input) => {
    if (!input) return null;
    return new Date(input); // Do not manually shift time
  };

  const checkEventStatus = () => {
    const now = new Date();
    const startTime = parseTargetDate(targetDate);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour event duration

    // Debug logs — helpful during development
  

    if (!startTime || isNaN(startTime)) return;

    if (now < startTime) {
      const diff = startTime - now;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
      setStatus("upcoming");
    } else if (now >= startTime && now < endTime) {
      setTimeLeft(null);
      setStatus("live");
    } else {
      setTimeLeft(null);
      setStatus("completed");
    }
  };

  useEffect(() => {
    checkEventStatus(); // run on mount
    const timer = setInterval(checkEventStatus, 1000); // update every second
    return () => clearInterval(timer); // clean up
  }, [targetDate]);

  // UI based on status
  return (
    <div className="mb-3">
      {status === "upcoming" && timeLeft && (
        <span className="badge bg-primary fs-6">
          ⏳ Starts in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
          {timeLeft.seconds}s
        </span>
      )}
      {status === "live" && (
        <span className="badge bg-danger fs-6">🔴 Live</span>
      )}
      {status === "completed" && (
        <span className="badge bg-secondary fs-6"> Completed</span>
      )}
    </div>
  );
};

export default CountdownTimer;
