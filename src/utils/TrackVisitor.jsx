import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { UAParser } from "ua-parser-js";
import { trackedPaths } from "../utils/trackedPaths";

const TrackVisitor = () => {
  const location = useLocation();

  useEffect(() => {
    if (!trackedPaths.includes(location.pathname)) return;

    const parser = new UAParser();
    const ua = parser.getResult();

    const deviceInfo = {
      os: ua.os.name,
      browser: ua.browser.name,
      deviceType: ua.device.type || "Desktop",
      vendor: ua.device.vendor || "Generic",
      model: ua.device.model || "Unknown",
    };

    axios.get("https://api.ipify.org?format=json").then((res) => {
      const ip = res.data.ip;

      axios.post("https://event-nine-xi.vercel.app/api/analytics", {
        deviceInfo,
        ip,
        timestamp: new Date(),
        page: location.pathname,
      });
    });
  }, [location.pathname]);

  return null;
};

export default TrackVisitor;
