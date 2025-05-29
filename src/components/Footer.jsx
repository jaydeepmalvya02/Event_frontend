import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  EnvelopeFill,
  TelephoneFill,
  GeoAltFill,
  HeartFill,
  ArrowRight,
} from "react-bootstrap-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://event-nine-xi.vercel.app/api/sub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      await response.json();

      if (response.ok) {
        toast.success("Subscribed to newsletter! 🎉", { autoClose: 3000 });
        setEmail(""); // Corrected this line
      } else {
        toast.error("Already Subscribed!", {
          autoClose: 3000,
        });
        setEmail("");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.", {
        autoClose: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 pt-12 pb-8 border-t border-gray-300">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="uppercase font-bold mb-4 flex items-center gap-3 text-indigo-700">
              <img
                src="/images/ExpertLogo.jpeg"
                alt="InstaMD Logo"
                className="bg-white p-1"
              />
            </h5>
            <p className="text-gray-600 mb-4">
              Connecting together with top medical professionals through
              innovative telehealth solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A106888510&keywords=instamd%20technology%20private%20limited"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-100 text-indigo-700 p-2 rounded-full hover:bg-indigo-200"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="uppercase font-bold mb-4 text-indigo-700">
              Quick Links
            </h5>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About Us" },
                { path: "/speakers", label: "Speakers" },
                { path: "/events", label: "Events" },
                { path: "/contact", label: "Contact" },
              ].map((item, idx) => (
                <li key={idx} className="group cursor-pointer">
                  <div
                    onClick={() => handleNavigate(item.path)}
                    className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
                  >
                    <ArrowRight
                      size={12}
                      className="text-indigo-400 group-hover:translate-x-1 transition-transform"
                    />
                    {item.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="uppercase font-bold p-4 mb-4 text-indigo-700">
              Contact Us
            </h5>
            <ul className="space-y-4 px-6 pb-4">
              <li className="flex items-start gap-2">
                <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full mt-1">
                  <GeoAltFill size={16} />
                </div>
                <span className="text-gray-600">Indore MP, India</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full mt-1">
                  <TelephoneFill size={16} />
                </div>
                <span className="text-gray-600">9619014245</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="bg-indigo-100 text-indigo-700 p-2 rounded-full mt-1">
                  <EnvelopeFill size={16} />
                </div>
                <span className="text-gray-600">support@instamd.com</span>
              </li>
            </ul>
          </div>

          {/* Subscribe Form */}
          <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h5 className="uppercase font-bold mb-4 text-indigo-700">
              Subscribe
            </h5>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-2xl text-sm font-medium flex justify-center items-center gap-2"
              >
                <HeartFill size={14} />
                {loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="md:flex justify-between text-center text-sm text-gray-600 border-t border-gray-300 pt-4">
          <p className="mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Designed and Developed By InstaMD.
            All rights reserved.
          </p>
          <div className="flex justify-center gap-4">
            <span
              onClick={() => handleNavigate("/privacy")}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              Privacy Policy
            </span>
            <span
              onClick={() => handleNavigate("/terms")}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              Terms of Service
            </span>
            <span
              onClick={() => handleNavigate("/faq")}
              className="hover:text-indigo-600 transition cursor-pointer"
            >
              FAQ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
