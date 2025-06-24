import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminSpeakerList = () => {
  const [speakerData, setSpeakerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSpeakers = async () => {
      try {
        const { data } = await axios.get(
          "https://event-nine-xi.vercel.app/api/speaker-list"
        );
        if (data.success) {
          setSpeakerData(data.speakerList);
        } else {
          toast.error(data.message || "Failed to fetch speakers");
        }
      } catch (error) {
        console.error(error.message);
        toast.error("❌ Network or server error!");
      } finally {
        setLoading(false);
      }
    };

    fetchAllSpeakers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer autoClose={1500} />
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0F93CA]">
        📋 Registered Speaker List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : speakerData.length === 0 ? (
        <p className="text-center text-gray-600">No speakers registered yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full text-sm text-gray-800">
            <thead className="bg-[#0F93CA] text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Company</th>
                <th className="px-4 py-2 text-left">Designation</th>
                <th className="px-4 py-2 text-left">LinkedIn</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">State</th>
                <th className="px-4 py-2 text-left">City</th>
                <th className="px-4 py-2 text-left">Division</th>
                <th className="px-4 py-2 text-left">Experience (yrs)</th>
              </tr>
            </thead>
            <tbody>
              {speakerData.map((speaker, index) => (
                <tr
                  key={speaker._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{speaker.name}</td>
                  <td className="px-4 py-2">{speaker.email}</td>
                  <td className="px-4 py-2">{speaker.phone}</td>
                  <td className="px-4 py-2">{speaker.company}</td>
                  <td className="px-4 py-2">{speaker.designation}</td>
                  <td className="px-4 py-2">
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      LinkedIn
                    </a>
                  </td>
                  <td className="px-4 py-2">{speaker.department}</td>
                  <td className="px-4 py-2">{speaker.state}</td>
                  <td className="px-4 py-2">{speaker.city}</td>
                  <td className="px-4 py-2">{speaker.division}</td>
                  <td className="px-4 py-2">{speaker.experience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSpeakerList;
