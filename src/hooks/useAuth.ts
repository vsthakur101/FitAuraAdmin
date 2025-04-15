import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import { getProfile } from '../services/authService';

const TOKEN_KEY = 'token';

export const useAuth = () => {
    const [user, setUser] = useState <User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);

        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const user = await getProfile();

                if (user) {
                    setUser(user);
                } else {
                    localStorage.removeItem(TOKEN_KEY);
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

    const login = (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
        navigate('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
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
