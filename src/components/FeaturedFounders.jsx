import React, { useState } from "react";
import SpeakerCard from "./SpeakerCard";

const speakers = [
  {
    name: "Dr. Pramod Kumar Rajput",
    title: "Global Leadership Coach | Pharma Business Leader",
    bio: "Sr. Vice President (F.) At Cadila Pharma",
    image: "/images/m10.jpg",
    description: `Dr. Pramod Rajput is a respected corporate leader turned educator with over 42 years of experience in the pharmaceutical and healthcare industry. Rising from a medical representative to Senior Vice President at Cadila Pharmaceuticals, his journey reflects exceptional dedication and business acumen. Now a "Professor of Practice" at multiple universities, he holds an MBA, a PhD, 14 honorary doctorates, 27 international certifications, and an Executive Leadership credential from IIM Ahmedabad. A passionate mentor and speaker, Dr. Rajput has guided over 65,000 individuals, delivered 500+ leadership talks globally, and authored two Amazon bestselling books. He serves on 26+ advisory boards and actively contributes to leadership development through his roles in academic, corporate, and policy circles.`,
  },
  {
    name: "Prashant Menon",
    title:
      "Founder Director at Workplace Dynamics | Co-Founder at The Bento Coach",
    bio: "Transforming leadership and teams through workplace intelligence.",
    image: "/images/m12.jpeg",
    description: `Prashant Menon is an eminent business leader and executive coach with over 25 years of experience in the pharmaceutical industry. Starting in frontline sales, he rose to senior leadership roles, including Managing Director at leading Indian and global pharma companies, where he led complex operations and large cross-functional teams. A strong believer in people centric leadership, he now drives transformation as Co-founder of The Bento Coach and founder of The Workplace Dynamics. Prashant holds international coaching credentials (ICF-ACC, Marshall Goldsmith SCC, GLA360) and teaches at NMIMS Mumbai. Recognized among the Top 100 Marketing Influencers by the World Marketing Congress, he blends strategic acumen with a human-centric leadership style.`,
  },
];

const FeaturedFounders = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoverTimer, setHoverTimer] = useState(null);

  const handleMouseEnter = (index) => {
    clearTimeout(hoverTimer); // clear previous timer if any
    setActiveIndex(index);

    const timer = setTimeout(() => {
      setActiveIndex(null); // hide after 10 seconds
    }, 10000);

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

      <div className="max-w-7xl mx-auto px-4 grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden relative"
          >
            {/* Image */}
            <div className="sm:w-1/2 h-60 sm:h-90 overflow-hidden">
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
