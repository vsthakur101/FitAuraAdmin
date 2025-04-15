import { Note } from "../../types";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note }: { note: Note }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{note.clientName}</h3>
                <p className="text-sm text-gray-500">{note.date}</p>
            </div>
            <p className="text-sm">{note.content}</p>
            <button
                onClick={() => navigate(`/trainer/clients/${note.clientId}`)}
                className="text-blue-600 text-sm mt-2 hover:underline"
            >
                View Client
            </button>
        </div>
    );
};

export default NoteCard;
