import React, { useState } from "react";
import SpeakerCard from "./SpeakerCard";

const speakers = [
  {
    name: "Dr. P. K. Rajput",
    title: "Pharma Business Leader | Sr. Vice President (F.) ",
    bio: " Cadila",
    image: "/images/m10.jpg",
    description: `Dr. Pramod Rajput is a respected corporate leader turned educator with over 42 years of experience in the pharmaceutical and healthcare industry. Rising from a medical representative to Senior Vice President at Cadila Pharmaceuticals, his journey reflects exceptional dedication and business acumen. Now a "Professor of Practice" at multiple universities, he holds an MBA, a PhD, 14 honorary doctorates, 27 international certifications, and an Executive Leadership credential from IIM Ahmedabad. A passionate mentor and speaker, Dr. Rajput has guided over 65,000 individuals, delivered 500+ leadership talks globally, and authored two Amazon bestselling books. He serves on 26+ advisory boards and actively contributes to leadership development through his roles in academic, corporate, and policy circles.`,
  },
  {
    name: "Prashant Menon",
    title: "Strategy Consultant | Leadership Coach | Founder Director",
    bio: "Workplace Dynamics.",
    image: "/images/m12.jpeg",
    description: `Prashant Menon is an eminent business leader and executive coach with over 25 years of experience in the pharmaceutical industry. Starting in frontline sales, he rose to senior leadership roles, including Managing Director at leading Indian and global pharma companies, where he led complex operations and large cross-functional teams. A strong believer in people centric leadership, he now drives transformation as Co-founder of The Bento Coach and founder of The Workplace Dynamics. Prashant holds international coaching credentials (ICF-ACC, Marshall Goldsmith SCC, GLA360) and teaches at NMIMS Mumbai. Recognized among the Top 100 Marketing Influencers by the World Marketing Congress, he blends strategic acumen with a human-centric leadership style.`,
  },
  {
    name: "Anil Fernandez",
    title: "Founder",
    bio: "SLIM Solutions.",
    image: "/images/Anil1.jpg",
    description: `Anil Fernandez is an esteemed healthcare leader, consultant, and educator with over 30 years of diverse experience spanning the pharmaceutical industry, academia, and strategic consulting. He has held influential roles at leading organizations such as Sanofi, Abbott, and Integrace, where he led strategic marketing, M&A, commercial excellence, and P&L functions. As the founder of SLIM Solutions, Anil now advises healthcare companies on innovation, leadership development, and marketing strategy. He also serves as visiting faculty at NMIMS Mumbai and mentors students at SIESCOMS, committed to nurturing future leaders and advancing a purpose-driven healthcare ecosystem.`,
  },
  {
    name: "Dr Ashok Kumar Bhattacharya",
    title: "(F.) Executive Director | Country Manager",
    bio: "Takeda Pharma",
    image: "/images/Ashok1.jpeg",
    description: `Dr. Ashok Kumar Bhattacharya, PhD (HC), MLE (Harvard), is a veteran pharma leader with over 40 years experience at GSK, Merck, and Takeda. As former Executive Director of Takeda India, he led major brand launches, M&A, and strategic growth. A Harvard Square Leadership Fellow and INSEAD-trained executive, he’s received the Lifetime Achievement, ICON of Healthcare, and Glory of India awards.`,
  },
  {
    name: "Hariram Krishnan",
    title: "Executive coach & Mentor (ICF certified)",
    bio: "Former MD - Galderma India Certified NLP practitioner",
    image: "/images/Hariram.jpeg",
    description: `As the Former Managing Director of Galderma India, Mr. Krishnan brings not only exceptional leadership but also a profound commitment to empowering individuals and organizations As an Executive Coach and Mentor, he has guided CEOs and MDs across diverse sectors, including healthcare and medical devices, helping them unlock their true potential.`,
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-row overflow-hidden w-full"
          >
            {/* Image */}
            <div className="w-1/2 h-60 sm:h-auto overflow-hidden">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Info */}
            <div className="p-6 w-1/2 flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {speaker.name}
              </h3>
              <p className="text-sm text-[#0F93CA] mb-2">{speaker.title}</p>
              <p className="text-gray-600 text-sm">{speaker.bio}</p>
            </div>

            {/* Hover Popup */}
            {activeIndex === idx && (
              <div className="absolute inset-0 z-20 bg-sky-100 bg-opacity-90 text-black transition-opacity duration-300 flex items-center justify-center p-6 text-sm text-center backdrop-blur-sm rounded-2xl">
                <SpeakerCard speaker={speaker} />
              </div>
            )}
          </div>
        ))}
        <style>{`
          .custom-scroll::-webkit-scrollbar {
            width: 0px;
          }

          .custom-scroll {
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE 10+ */
          }
        `}</style>
      </div>
    </section>
  );
};

export default FeaturedFounders;
