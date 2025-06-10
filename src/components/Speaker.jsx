import React, { useEffect, useState } from "react";
import axios from "axios";

const Speaker = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from backend
  const fetchSpeakers = async () => {
    try {
      const res = await axios.get(
        "https://event-nine-xi.vercel.app/api/speaker"
      ); // 🔁 Replace with your actual API if deployed
      setSpeakers(res.data);
    } catch (error) {
      console.error("Error fetching speaker data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

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

      {loading ? (
        <p className="text-center text-gray-500">Loading speakers...</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto px-4">
          {speakers.map((speaker) => (
            <div
              key={speaker._id}
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
      )}
    </section>
  );
};

export default Speaker;
