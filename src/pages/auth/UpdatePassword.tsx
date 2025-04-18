import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { updatePassword } from '../../services/authService';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';

interface FormData {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const UpdatePassword = () => {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<FormData>();
    const navigate = useNavigate();

    const onSubmit = async (data: FormData) => {
        const { oldPassword, newPassword, confirmPassword } = data;

        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        if (newPassword === oldPassword) {
            return toast.error('New password must be different from old password');
        }

        if (newPassword.length < 6 || newPassword.length > 20) {
            return toast.error('Password must be between 6 and 20 characters');
        }
        try {
            await updatePassword(oldPassword, newPassword);
            toast.success('Password updated successfully!');
            navigate('/trainer/dashboard');
        } catch (err) {
            console.log(err);
            toast.error('Failed to update password.');
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-black flex items-center justify-center px-4">
                <div className="max-w-md w-full text-white space-y-6">
                    <h2 className="text-3xl font-bold text-center">Change Password</h2>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Old Password */}
                        <div className="relative">
                            <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">Old Password</label>
                            <input
                                id="oldPassword"
                                type={showOld ? 'text' : 'password'}
                                {...register('oldPassword', { required: 'Old password is required' })}
                                className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-3 top-9 text-gray-500"
                            >
                                {showOld ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {errors.oldPassword && <p className="text-red-500 text-sm mt-1">{errors.oldPassword.message}</p>}
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                            <input
                                id="newPassword"
                                type={showNew ? 'text' : 'password'}
                                {...register('newPassword', {
                                    required: 'New password is required',
                                    minLength: { value: 6, message: 'At least 6 characters' },
                                    validate: (val) => val !== watch('oldPassword') || 'New password must be different from old password'
                                })}
                                className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-9 text-gray-500"
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type={showConfirm ? 'text' : 'password'}
                                {...register('confirmPassword', {
                                    required: 'Please confirm password',
                                    validate: (val) => val === watch('newPassword') || 'Passwords do not match',
                                })}
                                className="w-full px-4 py-2 rounded-md bg-black border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-9 text-gray-500"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
                        >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UpdatePassword;
