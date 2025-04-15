import { useEffect, useState } from "react";
import { getTrainerNotes } from "../../services/trainerService";
import { Note } from "../../types";
import NoteCard from "../../components/Trainer/NoteCard";

const Notes = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getTrainerNotes().then(setNotes);
    }, []);

    const filteredNotes = notes.filter((note) =>
        note.clientName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold">Trainer Notes</h1>
                <a
                    href="/trainer/clients"
                    className="btn-primary"
                >
                    + Add Note
                </a>
            </div>

            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by client name"
                className="border p-2 rounded mb-4 w-full sm:w-1/2"
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.length > 0 ? (
                    filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
                ) : (
                    <p className="text-gray-500 col-span-full">No notes found.</p>
                )}
            </div>
        </div>
    );
};

export default Notes;
