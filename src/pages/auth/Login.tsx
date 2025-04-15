import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      setTimeout(() => navigate("/trainer/dashboard"), 1000);
    } catch (error) {
      toast.error("Invalid credentials or server error");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <ToastContainer />
      <div className="bg-white rounded-lg w-full max-w-md p-8 shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-6 text-black">
          FitAura Admin Login
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Please fill in your unique admin login details below
        </p>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-500 text-sm"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <div className="mb-6 text-right">
          <a href="#" className="text-sm text-gray-500 hover:underline">
            forgot password?
          </a>
        </div>
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full bg-black text-white py-2 rounded hover:bg-gray-900 transition ${loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default Login;
