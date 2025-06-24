import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisterAsSpeakerForm from "../utils/RegisterAsSpeakerForm";
import { ToastContainer } from "react-toastify";

const Speaker = () => {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

  const fetchSpeakers = async () => {
    try {
      const res = await axios.get(
        "https://event-nine-xi.vercel.app/api/speaker"
      );
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
    <section className="py-12 bg-[#d7dde2]">
      <ToastContainer autoClose={1500} pauseOnHover closeOnClick />
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-[#0F93CA]">
          Speakers
        </h2>
        <h5 className="text-gray-600 mt-2 italic">
          Proud to bring inspirational speakers to our conference.
        </h5>
      </div>
      {/* Register as Speaker Button */}
      <div className="mt-12 text-center">
        <button
          onClick={() => setShowModal(true)}
          className="btn fw-bold text-white position-relative px-4 px-lg-5 py-2 py-lg-3"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            boxShadow: "0 4px 15px rgba(118, 75, 162, 0.3)",
            transition: "all 0.3s ease",
            overflow: "hidden",
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            letterSpacing: "0.5px",
            margin: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 25px rgba(118, 75, 162, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.3)";
          }}
        >
          Register as a Speaker
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-start sm:items-center z-50 px-4 py-10 overflow-y-auto">
          <div className="relative bg-gradient-to-br from-white via-[#f1f9ff] to-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-red-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold text-center text-[#0F93CA] mb-4">
              📣 Become a PitchPoint Speaker
            </h3>
            <RegisterAsSpeakerForm
              onSuccess={() => setShowModal(false)}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading speakers...</p>
      ) : (
        <>
          {/* Grid layout for sm and above */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-7xl mx-auto">
            {speakers.map((speaker) => (
              <div
                key={speaker._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-[90%] h-[520px] object-cover rounded-t-2xl border-b-2 border-gray-200 mx-auto mt-4 transition duration-300 ease-in-out hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-[#0F93CA] mb-2">{speaker.title}</p>
                  <p className="text-gray-600 text-sm">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal layout for xs (mobile) */}
          <div className="sm:hidden flex flex-col gap-6 max-w-xl mx-auto px-4">
            {speakers.map((speaker) => (
              <div
                key={speaker._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-row items-stretch overflow-hidden"
              >
                {/* Image Left */}
                <div className="w-[40%] overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover"
                    style={{
                      aspectRatio: "3 / 4",
                      objectFit: "cover",
                      height: "100%",
                    }}
                  />
                </div>

                {/* Info Right */}
                <div className="w-[60%] p-4 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-[#0F93CA] mb-1">{speaker.title}</p>
                  <p className="text-gray-600 text-sm">{speaker.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Speaker;
