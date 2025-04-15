import { Trainer } from "../../types";

const ProfileInfo = ({ trainer }: { trainer: Trainer }) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6 flex gap-4 items-center">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {trainer.name.charAt(0)}
            </div>
            <div>
                <h2 className="text-xl font-semibold">{trainer.name}</h2>
                <p className="text-sm text-gray-600">{trainer.email}</p>
                <p className="text-xs text-gray-500 uppercase mt-1">{trainer.role}</p>
            </div>
        </div>
    );
};

export default ProfileInfo;
