import React, { useState } from "react";
import SpeakerCard from "./SpeakerCard"; // reuse if already created

const speakers = [
  {
    name: "Dr. ICS Varma",
    title: "Co-Founder",
    bio: "ExpertOnBoard | Live Pharma Coalition | Regson Healthcare",
    image: "/images/m4.jfif",
    description: `Dr. ICS Varma is the Founder of ExpertOnBoard, a platform built on his belief that experience gains true value when shared. With over 25 years in the pharmaceutical and healthcare industries, he led digital transformation at Cipla, managed global operations, and drove leadership development initiatives. Recognizing the need for practical wisdom and cross-generational mentoring, he launched ExpertOnBoard to bridge the gap between theory and real-world insight in pharma sales and marketing. A respected Professor of Practice and visiting faculty at institutions like NIPER and Anna University, Dr. Varma continues to inspire future leaders through mentorship, collaboration, and industry-driven learning.`,
  },
];

const Founder = () => {
  const [active, setActive] = useState(false);
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleMouseEnter = () => {
    clearTimeout(hoverTimer);
    setActive(true);

    const timer = setTimeout(() => {
      setActive(false); // Auto-hide after 10 seconds
    }, 10000);

    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setActive(false);
  };

  return (
    <section className="py-12 bg-[#d7dde2]">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F93CA]">
          Founder
        </h2>
      </div>

      <div
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-6 relative group overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image */}
        <div className="md:w-1/2 overflow-hidden rounded-3xl h-[450px]">
          <img
            src={speakers[0].image}
            alt={speakers[0].name}
            className="w-full h-full object-cover rounded-3xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Basic Info */}
        <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left px-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {speakers[0].name}
          </h3>
          <p className="text-[#0F93CA] font-semibold mb-2">
            {speakers[0].title}
          </p>
          <p className="text-gray-700 italic mb-4">{speakers[0].bio}</p>
        </div>

        {/* Hover Description Popup */}
        {active && (
          <div className="absolute inset-0 z-20 bg-sky-100 bg-opacity-90 text-black transition-opacity duration-300 flex items-center justify-center p-6 text-sm text-center backdrop-blur-sm rounded-3xl">
            <SpeakerCard speaker={speakers[0]} />
          </div>
        )}
      </div>
    </section>
  );
};

export default Founder;
