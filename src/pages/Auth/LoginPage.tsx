import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { LoginService } from "../../api/Auth/LoginPage";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // signIn 함수 호출 (실제 경로에 맞게 import 필요)
      await LoginService.signIn({ email, password });

      // 로그인 성공 시 페이지 이동
      navigate("/todo-management");
    } catch (err) {
      // 에러 처리
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.");
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
          className="w-full py-3 pl-10 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
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
        {isLoading ? "로그인 중..." : "Sign In"}
      </button>

      {/* Link */}
      <p className="text-sm text-center text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-[#587CF0] font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
