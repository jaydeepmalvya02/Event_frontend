// useEffect in your main layout or homepage
import { useEffect } from "react";
import axios from "axios";
import { UAParser } from "ua-parser-js";

const TrackVisitor = () => {
  useEffect(() => {
    const parser = new UAParser();
    const ua = parser.getResult();

    const deviceInfo = {
      os: ua.os.name,
      browser: ua.browser.name,
      deviceType: ua.device.type || "Desktop",
      vendor: ua.device.vendor || "Generic",
      model: ua.device.model || "Unknown",
    };

    axios.post("https://your-backend.vercel.app/api/analytics", {
      deviceInfo,
      timestamp: new Date(),
      page: window.location.pathname,
    });
  }, []);

  return null;
};

export default TrackVisitor;
