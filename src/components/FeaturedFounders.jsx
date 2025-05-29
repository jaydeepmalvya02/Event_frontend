import React from "react";
import SpeakerCard from "./SpeakerCard";

const speakers = [
  {
    name: "Dr. Pramod Kumar Rajput",
    title: "Global Leadership Coach | Pharma Business Leader",
    bio: "Sr. Vice President (F.) At Cadila Pharma",
    image: "/images/m10.jpg",
    description: `Dr. Pramod Rajput is a respected corporate leader turned educator, with over 42 years of experience...`, // short version here
  },
  {
    name: "Prashant Menon",
    title:
      "Founder Director at Workplace Dynamics | Co-Founder at The Bento Coach",
    bio: "Transforming leadership and teams through workplace intelligence.",
    image: "/images/m12.jpeg",
    description: `Prashant Menon is a business leader and executive coach with 25+ years in the pharma industry...`, // short version here
  },
];

const FeaturedFounders = () => {
  return (
    <section className="py-12 bg-[#d7dde2]">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F93CA]">
          #PitchPoint Advisory Members
        </h2>
        <h5 className="text-gray-600 mt-2 italic">
          Proud to bring inspirational speakers to our conference.
        </h5>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative"
          >
            {/* Image */}
            <div className="sm:w-1/2 h-60 sm:h-auto overflow-hidden">
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

            {/* Hover Description Popup */}
            <div className="absolute inset-0 z-20 bg-black bg-opacity-90 text-white opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-300 flex items-center justify-center p-6 text-sm text-center backdrop-blur-sm">
              <SpeakerCard speaker={speaker} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedFounders;
