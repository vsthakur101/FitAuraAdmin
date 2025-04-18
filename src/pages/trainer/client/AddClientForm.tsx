import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addClientByTrainer } from '../../../services/clientService';
import { ClientData } from '../../../types';
import { AxiosError } from 'axios';

const clientSchema = z.object({
    name: z.string().min(3, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.number().refine((val) => /^\d{10}$/.test(String(val)), {
        message: 'Phone must be a valid 10 digit number'
    }),
    gender: z.enum(['Male', 'Female', 'Other'], { required_error: 'Gender is required' }),
    goal: z.enum(['Fat Loss', 'Muscle Gain', 'General Fitness'], { required_error: 'Fitness goal is required' }),
    weight: z.number().min(30, 'Minimum 30kg').max(300, 'Maximum 300kg'),
    height: z.number().min(80, 'Minimum 80cm').max(250, 'Maximum 250cm'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm your password').optional()
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

const AddClientForm = () => {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ClientData>({
        resolver: zodResolver(clientSchema),
    });

    const onSubmit = async (data: ClientData, event?: React.BaseSyntheticEvent) => {
        try {
            event?.preventDefault();
            const formData = new FormData();
            const clientPayload = {
                ...data
            };
            delete clientPayload.confirmPassword;
            if (profileImage) {
                formData.append('profile_photo', profileImage);
            }
            Object.entries(clientPayload).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value as string | Blob);
                }
            });
            await addClientByTrainer(formData);
            toast.success('Client added successfully!');
            reset();
        } catch (err: unknown) {
            if (
                err &&
                typeof err === 'object' &&
                'response' in err &&
                (err as AxiosError<{ message: string }>).response?.data?.message
            ) {
                toast.error((err as AxiosError<{ message: string }>).response?.data?.message);
            } else {
                toast.error('An error occurred while adding the client.');
            }
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const file: File | null = e.target.files ? e.target.files[0] : null;
        if (file) setProfileImage(URL.createObjectURL(file));
    };

    return (
        <div className="p-6 text-white max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Add New Client</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center gap-4">
                    <label className="w-24 h-24 rounded-full overflow-hidden border border-gray-600 flex items-center justify-center cursor-pointer">
                        {profileImage ? (
                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-sm text-gray-400">Upload</span>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                    <p className="text-sm text-gray-400">Upload profile picture</p>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block mb-1">Full Name</label>
                        <input
                            id="name"
                            {...register('name')}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-1">Phone</label>
                        <input
                            id="phone"
                            type='tel'
                            placeholder="10 digit number"
                            {...register('phone', { valueAsNumber: true })}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="gender" className="block mb-1">Gender</label>
                        <select
                            id="gender"
                            {...register('gender')}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        >
                            <option value="">Select</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
                    </div>
                </div>

                {/* Fitness Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="goal" className="block mb-1">Fitness Goal</label>
                        <select
                            id="goal"
                            {...register('goal')}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        >
                            <option value="">Select</option>
                            <option value="Fat Loss">Fat Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="General Fitness">General Fitness</option>
                        </select>
                        {errors.goal && <span className="text-red-500 text-sm">{errors.goal.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="weight" className="block mb-1">Weight (kg)</label>
                        <input
                            id="weight"
                            type="number"
                            {...register('weight', { valueAsNumber: true })}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.weight && <span className="text-red-500 text-sm">{errors.weight.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="height" className="block mb-1">Height (cm)</label>
                        <input
                            id="height"
                            type="number"
                            {...register('height', { valueAsNumber: true })}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.height && <span className="text-red-500 text-sm">{errors.height.message}</span>}
                    </div>
                </div>

                {/* Password Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register('password')}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-1">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            {...register('confirmPassword')}
                            className="w-full bg-black border border-gray-600 rounded px-4 py-2"
                        />
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 justify-end">
                    <button type="button" onClick={() => reset()} className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600">Cancel</button>
                    <button type="submit" className="bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200">Add Client</button>
                </div>
            </form>
        </div>
    );
};

export default AddClientForm;
