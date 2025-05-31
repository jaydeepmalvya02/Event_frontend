import React from "react";

const speakers = [
  {
    name: "Dr. ICS Varma ",
    title: "Co-Founder Of Regson Healthcare  ",
    bio: "  Live Pharma Coalition| ExpertOnBoard ",
    image: "/images/m4.jfif",
  },
];

const Founder = () => {
  return (
    <section className="py-12 bg-[#d7dde2]">
      <div className="text-center mb-12 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F93CA]">
          #Founder
        </h2>
        
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Left - Image */}
        <div className="md:w-1/2 overflow-hidden rounded-3xl">
          <img
            src={speakers[0].image}
            alt={speakers[0].name}
            className="w-full h-full object-cover rounded-3xl max-h-[450px]"
          />
        </div>

        {/* Right - Details */}
        <div className="md:w-1/2 flex flex-col justify-center text-center md:text-left px-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {speakers[0].name}
          </h3>
          <p className="text-[#0F93CA] font-semibold mb-2">
            {speakers[0].title}
          </p>
          <p className="text-gray-700 italic mb-4">{speakers[0].bio}</p>
          <p className="text-gray-600 text-sm whitespace-pre-line">
            {speakers[0].description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Founder;
