import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendOtp, verifyOtp } from '../../services/authService';
import { AuthState, forgotPassword } from '../../redux/slices/authSlice'; // Adjust the path as needed
import { useDispatch, useSelector } from 'react-redux';

const VerifyOtp = () => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const email = useSelector((state: { auth: AuthState }) => state.auth.forgotPassword?.email || '');

    useEffect(() => {
        if (!email) {
            toast.error("Email not found");
            navigate('/login');
        }
    }, [email, navigate]);


    const handleChange = (index: number, value: string) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    const handleResendOtp = async () => {
        if (!email) {
            toast.error("Email not found");
            return;
        }
        try {
            const res = await sendOtp(email);
            dispatch(forgotPassword({ resetToken: res.resetToken, email }));
            toast.success("Please check your email for the otp");
        } catch (error) {
            toast.error("Invalid email or server error");
            console.error("Login error:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        console.log('Entered OTP:', enteredOtp);

        if (enteredOtp.length === 4) {
            // Simulate verification
            try {
                await verifyOtp(email, enteredOtp);
                navigate('/reset-password');
                toast.success("OTP verified successfully");
            } catch (error) {
                toast.error("Invalid email or server error");
                console.error("Login error:", error);
            }
            navigate('/reset-password');
        } else {
            toast.error('Please enter full 4-digit OTP');
        }
    };
    
    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="max-w-sm w-full text-white space-y-6 text-center">
                <h2 className="text-3xl font-bold">Password Reset</h2>
                <p className="text-gray-400 text-sm">We sent otp on {email}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-center gap-4">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputs.current[index] = el;
                                }}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                maxLength={1}
                                className="w-12 h-12 text-center border border-white bg-black rounded-md text-white text-xl focus:outline-none focus:ring-2 focus:ring-white"
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black py-2 rounded-md font-semibold hover:bg-gray-200 transition"
                    >
                        Continue
                    </button>
                </form>

                <p className="text-sm text-gray-400">
                    Didn't receive an email? <span className="underline cursor-pointer" onClick={handleResendOtp}>Click To Resend</span>
                </p>

                <a href="/login" className="text-sm text-gray-300 hover:underline inline-block">
                    &larr; Back to login
                </a>
            </div>
        </div>
    );
};

export default VerifyOtp;
