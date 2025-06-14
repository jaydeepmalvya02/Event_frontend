import React, { useEffect, useState } from "react";
import axios from "axios";

const FeaturedSpeakers = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSpeakers = async () => {
    try {
      const res = await axios.get(
        "https://event-nine-xi.vercel.app/api/speaker"
      );
      setSpeakers(res.data);
    } catch (error) {
      console.error("Error fetching speakers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

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

      {loading ? (
        <p className="text-center text-gray-500">Loading speakers...</p>
      ) : (
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
                    className="w-full h-full object-contain transform transition duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {speaker.name}
                  </h3>
                  <p className="text-sm mb-1" style={{ color: "#0F93CA" }}>
                    {speaker.title}
                  </p>
                  <p className="text-gray-600 text-sm">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
