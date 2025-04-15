import { Note } from "../../types";

const NotesPreview = ({ notes, clientId }: { notes: Note[]; clientId: number }) => {
    const handleAddNote = () => {
        window.location.href = `/trainer/notes?clientId=${clientId}`;
    };

    return (
        <div className="bg-white rounded-2xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Recent Notes</h2>
                <button onClick={handleAddNote} className="btn-primary">Add Note</button>
            </div>
            {notes.length === 0 ? (
                <p className="text-gray-500">No notes yet.</p>
            ) : (
                <ul className="space-y-2">
                    {notes.map(note => (
                        <li key={note.id} className="border-b pb-2">
                            <p className="text-sm">{note.content}</p>
                            <p className="text-xs text-gray-500">{note.date}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NotesPreview;
