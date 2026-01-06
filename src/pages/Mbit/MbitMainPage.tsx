import React from "react";
import { Sparkles, Users, GraduationCap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MbitHome: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 p-8 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            Welcome to MBIT
          </h1>
          <p className="text-lg text-gray-600">
            Discover your developer fortune, personality, and ideal major
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div
            onClick={() => navigate("/mbit/fortune")}
            className="p-8 transition-all transform bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-800">
              Today's Fortune
            </h3>
            <p className="mb-6 text-gray-600">
              Check your daily developer fortune and see what the code gods have
              in store for you today
            </p>
            <div className="flex items-center text-[#587CF0] font-medium">
              <span>Check Fortune</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          <div
            onClick={() => navigate("/mbit/personality")}
            className="p-8 transition-all transform bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-400">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-800">
              MBIT Personality
            </h3>
            <p className="mb-6 text-gray-600">
              Discover your developer personality type and learn about your
              coding style
            </p>
            <div className="flex items-center text-[#587CF0] font-medium">
              <span>Take Test</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          <div
            onClick={() => navigate("/mbit/major")}
            className="p-8 transition-all transform bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-green-400 to-teal-400">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-800">
              Major Recommendation
            </h3>
            <p className="mb-6 text-gray-600">
              Find the perfect tech major that matches your interests and
              strengths
            </p>
            <div className="flex items-center text-[#587CF0] font-medium">
              <span>Get Recommendation</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbitHome;
