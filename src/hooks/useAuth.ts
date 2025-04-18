import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { getProfile } from '../services/authService';

export const useAuth = () => {
    const [user, setUser] = useState <User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const {user} = await getProfile();
                console.log('user profile:', user); // 🔒 Log user object for debugging
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }
            } catch (err) {
                console.error('Auth error:', err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const login = () => {
        navigate('/dashboard');
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
    };
};
