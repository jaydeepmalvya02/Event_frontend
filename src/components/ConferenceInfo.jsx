import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ConferenceInfo = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#e84943] to-[#ff6a5e] hover:from-[#d63d3a] hover:to-[#d45650] transition-all duration-700 py-16 animate-gradient-slow bg-[length:300%_300%]">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-6 text-white text-center"
      >
        <h2 className="text-[80px] leading-[1.2] font-bold">The #PitchPoint</h2>
        <h5 className="text-[22px] tracking-wider mt-2">
          Not just a pitch. It's a turning point.
        </h5>
        <h6 className="text-[22px] mt-2">07 June 2025 | 11:00 am</h6>

        <div className="mt-10 text-[16px] leading-[1.6] tracking-wide">
          <p className="mb-4">
            PitchPoint isn’t just another webinar it’s a front-row seat to the
            future of pharma sales and marketing.
          </p>
          <p>
            Powered by InstaMD and presented by ExpertOnTalk, PitchPoint was
            born from a simple yet powerful idea: to create a space where
            experience meets innovation, and real-world insights inspire action.
            Each session features leading voices from across the industry
            sharing fresh perspectives, data-driven strategies, and hard-earned
            lessons from the pharma sales and marketing field.
          </p>
          <p>
            Our mission is to fuel learning, spark strategic thinking, and equip
            pharma professionals with the tools to thrive in a fast-evolving
            marketplace. Whether you're leading teams or just launching your
            journey, PitchPoint is your destination for meaningful conversations
            and impactful growth.
          </p>
        </div>
      </motion.div>
      <style>
        {`
          @keyframes gradient-slow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-slow {
            animation: gradient-slow 15s ease infinite;
          }
        `}
      </style>
    </div>
  );
};

export default ConferenceInfo;
