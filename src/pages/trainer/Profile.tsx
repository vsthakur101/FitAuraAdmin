import { useEffect, useState } from "react";
import { getTrainerProfile } from "../../services/authService";
import { Trainer } from "../../types";
import ProfileInfo from "../../components/Trainer/ProfileInfo";
import EditProfileForm from "../../components/Trainer/EditProfileForm";

const Profile = () => {
    const [trainer, setTrainer] = useState<Trainer | null>(null);

    useEffect(() => {
        getTrainerProfile().then(setTrainer);
    }, []);

    if (!trainer) return <p className="p-4">Loading...</p>;

    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Trainer Profile</h1>
            <ProfileInfo trainer={trainer} />
            <EditProfileForm trainer={trainer} />
        </div>
    );
};

export default Profile;
