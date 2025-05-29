import React from "react";

const SpeakerCard = ({ speaker }) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="text-lg font-bold mb-2">{speaker.name}</div>
      <div className="text-sm text-[#0F93CA] mb-2">{speaker.title}</div>
      <p className="text-sm">{speaker.description}</p>
    </div>
  );
};

export default SpeakerCard;
