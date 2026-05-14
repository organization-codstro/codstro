import { Outlet } from "react-router-dom";
import { Code2 } from "lucide-react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#587CF0] via-[#7B9EF7] to-[#A8C5FF] flex items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-2xl">
        {/* Header (공통) */}
        <div className="bg-gradient-to-r from-[#587CF0] to-[#7B9EF7] p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white rounded-full bg-opacity-20">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white">Codstro</h1>
          <p className="text-sm text-white text-opacity-90">
            High School Coding Journey Starts Here
          </p>
        </div>

        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
