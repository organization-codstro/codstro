import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        navigate("/woomoonjeong");
      }}
    >
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
          className="w-full py-3 pl-10 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none"
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
        Sign In
      </button>

      {/* Link */}
      <p className="text-sm text-center text-gray-500">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-[#587CF0] font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  );
}
