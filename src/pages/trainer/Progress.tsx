import { useEffect, useState } from "react";
import { getProgressLogs } from "../../services/progressService";
import { ProgressLog } from "../../types";
import ProgressLogCard from "../../components/Trainer/ProgressLogCard";
import AddProgressForm from "../../components/Trainer/AddProgressForm";

const Progress = () => {
    const [logs, setLogs] = useState<ProgressLog[]>([]);

    const loadLogs = () => {
        getProgressLogs().then(setLogs);
    };

    useEffect(() => {
        loadLogs();
    }, []);

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Progress Tracker</h1>

            <AddProgressForm clientId={1} onAdd={loadLogs} />

            <div className="grid gap-4 sm:grid-cols-2">
                {logs.map((log) => (
                    <ProgressLogCard key={log.id} log={log} />
                ))}
            </div>
        </div>
    );
};

export default Progress;
