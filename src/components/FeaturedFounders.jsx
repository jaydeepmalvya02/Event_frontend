import React, { useState } from "react";
import SpeakerCard from "./SpeakerCard";

const speakers = [
  {
    name: "Dr. Pramod Kumar Rajput",
    title: "Global Leadership Coach | Pharma Business Leader",
    bio: "Sr. Vice President (F.) At Cadila Pharma",
    image: "/images/m10.jpg",
    description: `Dr. Pramod Rajput is a respected corporate leader turned educator...`,
  },
  {
    name: "Prashant Menon",
    title:
      "Founder Director at Workplace Dynamics | Co-Founder at The Bento Coach",
    bio: "Transforming leadership and teams through workplace intelligence.",
    image: "/images/m12.jpeg",
    description: `Prashant Menon is an eminent business leader and executive coach...`,
  },
  {
    name: "Anil Fernandez",
    title: "Founder",
    bio: "SLIM Solutions.",
    image: "/images/Anil1.jpg",
    description: `Anil Fernandez is an esteemed healthcare leader, consultant, and educator...`,
  },
];

const FeaturedFounders = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleMouseEnter = (index) => {
    clearTimeout(hoverTimer);
    setActiveIndex(index);
    const timer = setTimeout(() => setActiveIndex(null), 10000);
    setHoverTimer(timer);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimer);
    setActiveIndex(null);
  };

  return (
    <section className="py-12 bg-[#d7dde2]">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight">
          #PitchPoint Advisory Members
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row  sm:scrollbar-none gap-6 px-4 max-w-7xl mx-auto">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden w-full sm:min-w-[400px]"
          >
            {/* Image */}
            <div className="w-full sm:w-1/2 h-60 sm:h-auto overflow-hidden">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Basic Info */}
            <div className="p-6 sm:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {speaker.name}
              </h3>
              <p className="text-sm text-[#0F93CA] mb-2">{speaker.title}</p>
              <p className="text-gray-600 text-sm">{speaker.bio}</p>
            </div>

            {/* Popup Description */}
            {activeIndex === idx && (
              <div className="absolute inset-0 z-20 bg-sky-100 bg-opacity-90 text-black transition-opacity duration-300 flex items-center justify-center p-6 text-sm text-center backdrop-blur-sm rounded-2xl">
                <SpeakerCard speaker={speaker} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFounders;
