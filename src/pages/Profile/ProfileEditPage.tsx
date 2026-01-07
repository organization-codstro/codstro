import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar } from "lucide-react";
import { mockUser } from "../../data/Profile/user";
import EditHeader from "../../components/Profile/ProfileEditPage/EditHeader";
import ProfileAvatar from "../../components/Profile/ProfileEditPage/ProfileAvatar";
import FormInput from "../../components/Profile/ProfileEditPage/FormInput";
import EditActionButtons from "../../components/Profile/ProfileEditPage/EditActionButtons";


export default function ProfileEdit() {
  const navigate = useNavigate();

  // 상태 관리
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
    joinDate: mockUser.joinDate,
  });

  // 핸들러 함수
  const handleSave = () => {
    // 🔔 나중에 여기서 API / Supabase 연동
    console.log("Saved profile:", formData);
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="max-w-3xl p-8 mx-auto">
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* 1. 헤더 영역 */}
        <EditHeader title="Edit Profile" onClose={handleCancel} />

        <div className="space-y-6">
          {/* 2. 아바타 영역 */}
          <ProfileAvatar name={formData.name} />

          {/* 3. 입력 필드들 */}
          <div className="space-y-4">
            <FormInput
              label="Name"
              icon={User}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <FormInput
              label="Email"
              icon={Mail}
              value={formData.email}
              disabled
              helperText="Email cannot be changed"
            />

            <FormInput
              label="Join Date"
              type="date"
              icon={Calendar}
              value={formData.joinDate}
              disabled
            />
          </div>

          {/* 4. 액션 버튼 영역 */}
          <EditActionButtons onCancel={handleCancel} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
}
