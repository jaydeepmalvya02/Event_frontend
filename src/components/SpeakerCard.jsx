// SpeakerCard.jsx
const SpeakerCard = ({ speaker }) => {
  return (
    <div className="text-left max-h-[380px] overflow-hidden flex flex-col">
      <h3 className="text-xl font-bold text-[#0F93CA] mb-1">{speaker.name}</h3>
      <p className="text-sm text-gray-700 mb-1 font-medium">{speaker.title}</p>
      <p className="text-sm text-gray-500 mb-3">{speaker.bio}</p>

      <div className="overflow-y-auto pr-2 custom-scroll flex-grow">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {speaker.description}
        </p>
      </div>
    </div>
  );
};

export default SpeakerCard;
