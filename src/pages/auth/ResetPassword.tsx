import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/authService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { AuthState } from '../../redux/slices/authSlice';

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const email = useSelector((state: {auth: AuthState}) => state.auth.forgotPassword?.email || '');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
        await resetPassword(email, data.password);
        toast.success('Password reset successful!');
        navigate('/login');
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-white space-y-6">
        <h2 className="text-3xl font-bold text-center">Set New Password</h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
              })}
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 text-sm"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            {isSubmitting ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className="text-center">
          <a href="/login" className="text-sm text-gray-300 hover:underline">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
