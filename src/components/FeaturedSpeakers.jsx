import React from "react";

const speakers = [
  {
    name: "Dr. Subhojit Mukherjee",
    title: "Head Of India Formulations",
    bio: "Celsius Healthcare Pvt. Ltd",
    image: "/images/m5.jpeg",
  },
  {
    name: "Devesh Gangani",
    title: "Associate General Manager",
    bio: "Alkem Laboratories Ltd.",
    image: "/images/m6.jpeg",
  },
  {
    name: "Dr. Pramod Kumar Rajput",
    title: "Global Leadership Coach | Pharma Business Leader",
    bio: "Sr. Vice President (F.) At Cadila Pharma",
    image: "/images/m10.jpg",
  },
  {
    name: "Anil fernandez",
    title: "Founder ",
    bio: " - SLIM (Strategy, Leadership, Innovation, Marketing) Solutions Visiting Faculty",
    image: "/images/m1.jfif",
    className: "rounded-full",
  },
  {
    name: "Thamburaj Anthuvan ",
    title: "Senior Vice President ",
    bio: " USV PVT LTD ",
    image: "/images/m2.jfif",
  },
  {
    name: "Devdutt Kaushal ",
    title: "Associate Director Business Development Commercial manager ",
    bio: "  LATAM Countries at Cipla",
    image: "/images/m11.jpg",
  },
  {
    name: "Dr. ICS Varma ",
    title: "Co-Founder",
    bio: "  Regson Healthcare| Live Pharma Coalition| ExpertOnBoard ",
    image: "/images/m4.jfif",
  },
];

const FeaturedSpeakers = () => {
  return (
    <section className="py-12 bg-[#d7dde2]">
      <div className="text-center mb-10">
        <h2
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: "#0F93CA" }}
        >
         #PitchPoint Speakers
        </h2>
        <h5 className="text-gray-600 mt-2" style={{ fontStyle: "italic" }}>
          Proud to bring inspirational speakers to our conference.
        </h5>
      </div>

      <div className="overflow-hidden max-w-6xl mx-auto">
        <div className="flex animate-scroll gap-6 w-max">
          {[...speakers, ...speakers].map((speaker, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden min-w-[350px] max-w-[350px]"
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-97% object-fit-cover transform transition duration-300 ease-in-out hover:scale-105"
                  // style={{ height: "300px" }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {speaker.name}
                </h3>
                <p className="text-sm  mb-1 " style={{ color: "#0F93CA" }}>{speaker.title}</p>
                <p className="text-gray-600 text-sm">{speaker.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default FeaturedSpeakers;
