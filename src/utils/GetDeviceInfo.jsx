// src/utils/getDeviceInfo.js
import { UAParser } from "ua-parser-js";

export const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    os: result.os.name,
    browser: result.browser.name,
    deviceType: result.device.type || "Desktop",
    vendor: result.device.vendor || "Generic",
    model: result.device.model || "Unknown",
  };
};
