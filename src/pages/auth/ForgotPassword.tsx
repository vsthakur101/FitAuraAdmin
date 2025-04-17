import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { sendOtp } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../redux/slices/authSlice'; // Adjust the path as needed

type ForgotForm = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: ForgotForm) => {
    const { email } = data;
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    try {
      const res = await sendOtp(email);
      dispatch(forgotPassword({resetToken: res.resetToken, email}));
      toast.success("Please check your email for the otp");
      navigate("/verify-otp");
    } catch (error) {
      toast.error("Invalid email or server error");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-white space-y-6">
        <h2 className="text-3xl font-bold text-center">Forgot Password</h2>
        <p className="text-sm text-gray-400 text-center">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm mb-1 font-medium">
              Email address
            </label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
          >
            {isSubmitting ? 'Sending...' : 'Send'}
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

export default ForgotPassword;
