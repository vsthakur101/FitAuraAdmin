import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../services/authService";
import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../redux/slices/authSlice';

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data: LoginForm) => {
    const { email, password } = data;
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    try {
      const res = await login(email, password);
      console.log("Login response:", res);
      localStorage.setItem("token", res.token);
      toast.success("Login successful!");
      navigate("/trainer/dashboard")
    } catch (error) {
      toast.error("Invalid credentials or server error");
      console.error("Login error:", error);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-sm w-full space-y-8 text-white relative">
        <h2 className="text-center text-3xl font-bold">Log in</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password + Toggle */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 text-sm"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Forgot Password */}
          <div className="text-right" onClick={handleForgotPassword}>
            <a className="text-sm text-gray-300 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
