import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, Save, X } from "lucide-react";
import { mockUser } from "../../data/Profile/user";

export default function ProfileEdit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    joinDate: mockUser.joinDate,
  });

  const handleSave = () => {
    // 🔔 나중에 여기서 API / Supabase 연동
    console.log("Saved profile:", formData);

    // 저장 후 프로필 페이지로 이동
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="max-w-3xl p-8 mx-auto">
      <div className="p-8 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>

          <button
            onClick={handleCancel}
            className="p-2 transition-colors rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <div
              className="flex items-center justify-center w-24 h-24 text-4xl font-bold text-white rounded-full"
              style={{ backgroundColor: "#587CF0" }}
            >
              {formData.name.charAt(0)}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="relative">
              <User className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-[#587CF0]"
              />
            </div>
          </div>

          {/* Email (readonly) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full py-2 pl-10 pr-4 text-gray-500 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Email cannot be changed
            </p>
          </div>

          {/* Join Date (readonly) */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Join Date
            </label>
            <div className="relative">
              <Calendar className="absolute w-4 h-4 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <input
                type="date"
                value={formData.joinDate}
                disabled
                className="w-full py-2 pl-10 pr-4 text-gray-500 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2
                         px-4 py-2 bg-[#587CF0] text-white rounded-lg
                         hover:bg-[#4a68d9] font-medium"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
