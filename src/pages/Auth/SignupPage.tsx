import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, EyeOff, Eye } from "lucide-react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        // 실제로는 회원가입 API 호출
        navigate("/login");
      }}
    >
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
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#587CF0] text-white py-3 rounded-lg font-medium hover:bg-[#4A6EE8] transition-colors"
      >
        Create Account
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
