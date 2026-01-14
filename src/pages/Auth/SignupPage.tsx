import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";
import { SignupService } from "../../api/Auth/SignupPage";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // signUp 함수 호출 (실제 경로에 맞게 import 필요)
      await SignupService.signUp({
        email,
        password,
        name,
        profileFile: undefined, // 이미지 업로드 기능 추가 시 사용
      });

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/login");
    } catch (err) {
      // 에러 처리
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 border border-red-200 rounded-lg bg-red-50">
          {error}
        </div>
      )}

      {/* Name */}
      <div className="relative">
        <User className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
        <input
          type="text"
          placeholder="Full Name"
          className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Email */}
      <div className="relative">
        <Mail className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
        <input
          type="email"
          placeholder="Email Address"
          className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-3 top-1/2" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="w-full py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          minLength={6}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
          disabled={isLoading}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#587CF0] text-white py-3 rounded-lg font-medium hover:bg-[#4A6EE8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "계정 생성 중..." : "Create Account"}
      </button>

      {/* Link */}
      <p className="text-sm text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="text-[#587CF0] font-medium">
          Login
        </Link>
      </p>
    </form>
  );
}
