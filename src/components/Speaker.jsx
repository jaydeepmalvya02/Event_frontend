import React from "react";
import { FaArrowUp } from "react-icons/fa";

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
    image: "/images/m14.jpeg",
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
    title: "Co-Founder Of Regson Healthcare  ",
    bio: "  Live Pharma Coalition| ExpertOnBoard ",
    image: "/images/m4.jfif",
  },
];

const Speaker = () => {
  return (
    <section className="py-12" style={{ background: "#d7dde2" }}>
      <div className="text-center mb-10">
        <h2
          className="text-3xl font-extrabold tracking-tight"
          style={{ color: "#0F93CA" }}
        >
          Speakers
        </h2>
        <h5 className="text-gray-600 mt-2" style={{ fontStyle: "italic" }}>
          Proud to bring inspirational speakers to our conference.
        </h5>
      </div>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto px-4">
        {speakers.map((speaker, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-md transform transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 border border-transparent"
          >
            <div className="w-full h-96 overflow-hidden rounded-t-2xl">
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-[90%] h-[520px] object-cover rounded-t-2xl border-b-2 border-gray-200 mx-auto mt-4 transition duration-300 ease-in-out hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">
                {speaker.name}
              </h3>
              <p className="text-sm text-indigo-600 mb-2">{speaker.title}</p>
              <p className="text-gray-600 text-sm">{speaker.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Speaker;
