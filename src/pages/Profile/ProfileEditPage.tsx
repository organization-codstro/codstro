import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar } from "lucide-react";
import { toast } from "react-toastify";
import { LoginService } from "../../api/Auth/LoginPage";
import { ProfileEditService } from "../../api/Profile/ProfileEditPage";
import EditHeader from "../../components/Profile/ProfileEditPage/EditHeader";
import ProfileAvatar from "../../components/Profile/ProfileEditPage/ProfileAvatar";
import FormInput from "../../components/Profile/ProfileEditPage/FormInput";
import EditActionButtons from "../../components/Profile/ProfileEditPage/EditActionButtons";
import { ProfileFormData } from "../../types/pages/Profile/ProfileEditPage/ProfileEditPage";

/* -------------------------------------------------------------------------- */
/* API 및 데이터 관련 타입                                */
/* -------------------------------------------------------------------------- */

export default function ProfileEditPage() {
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /* 상태 관리                                     */
  /* -------------------------------------------------------------------------- */
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    email: "",
    joinDate: "",
    profileUrl: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  /* -------------------------------------------------------------------------- */
  /* 데이터 초기 로드 (Lifecycle)                    */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        // 1. 현재 유저 ID 가져오기
        const currentUserId = await LoginService.getCurrentUserId();

        if (!currentUserId) {
          toast.error("로그인이 필요합니다.");
          navigate("/login");
          return;
        }
        setUserId(currentUserId);

        // 2. DB에서 프로필 정보 조회
        const profile = await ProfileEditService.getUserProfile({
          userId: currentUserId,
        });

        setFormData({
          name: profile.user_name || "",
          email: profile.user_email || "",
          joinDate: profile.user_join_date || "",
          profileUrl: profile.user_profile_url || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("프로필 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  /* -------------------------------------------------------------------------- */
  /* 핸들러 함수                                   */
  /* -------------------------------------------------------------------------- */

  // 저장 핸들러
  const handleSave = async () => {
    if (!userId) return;

    const loadingToast = toast.loading("프로필을 업데이트 중입니다...");
    setIsSaving(true);

    try {
      const result = await ProfileEditService.updateProfile({
        userId,
        name: formData.name,
        imageFile: formData.imageFile, // 파일이 있으면 Firebase 업로드 후 DB 저장됨
      });

      if (result.success) {
        toast.update(loadingToast, {
          render: "프로필이 성공적으로 수정되었습니다.",
          type: "success",
          isLoading: false,
          autoClose: 500,
        });
        // 약간의 지연 후 이동하여 사용자에게 완료 상태 인지시킴
        setTimeout(() => navigate("/profile"), 1000);
      }
    } catch (error) {
      console.error(error);
      toast.update(loadingToast, {
        render: "업데이트 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  // 이미지 선택 시 처리 (ProfileAvatar 컴포넌트 내부에서 호출될 함수로 전달 필요)
  const handleImageChange = (file: File) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      // 미리보기용 URL 생성 (실제 저장은 Save 시점에 수행)
      profileUrl: URL.createObjectURL(file),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl p-8 mx-auto">
      <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
        {/* 1. 헤더 영역 */}
        <EditHeader title="Edit Profile" onClose={handleCancel} />

        <div className="space-y-6">
          {/* 2. 아바타 영역 - 이미지 변경 로직 연결 필요 시 onImageChange 추가 */}
          <ProfileAvatar
            name={formData.name}
            src={formData.profileUrl}
            onImageChange={handleImageChange} // 이전에 만든 핸들러 연결
          />

          {/* 3. 입력 필드들 */}
          <div className="space-y-4">
            <FormInput
              label="Name"
              icon={User}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              disabled={isSaving}
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
              type="text" // Date Picker 대신 일반 텍스트로 표시하거나 DB 형식에 맞춰 수정
              icon={Calendar}
              value={formData.joinDate}
              disabled
            />
          </div>

          {/* 4. 액션 버튼 영역 */}
          <EditActionButtons
            onCancel={handleCancel}
            onSave={handleSave}
            disabled={isSaving}
          />
        </div>
      </div>
    </div>
  );
}
