import React, { useEffect, useState, useCallback } from "react";

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = useCallback(() => {
    if (!targetDate) return null;
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return null;

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (!updated) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  if (!timeLeft) {
    return <div className="text-danger fw-bold">⏰ Event Started!</div>;
  }

  return (
    <div className="text-primary fw-semibold mb-2">
      ⏳ Starts in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
      {timeLeft.seconds}s
    </div>
  );
};

export default CountdownTimer;
