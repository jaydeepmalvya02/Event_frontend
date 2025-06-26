// SpeakerCard.jsx
const SpeakerCard = ({ speaker }) => {
  return (
    <div className="text-left max-h-[380px] overflow-hidden flex flex-col">
 
     

      <div className="overflow-y-auto pr-2 custom-scroll flex-grow">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
          {speaker.description}
        </p>
      </div>
    </div>
  );
};

export default SpeakerCard;
