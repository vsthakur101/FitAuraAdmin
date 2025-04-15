import { ProgressLog } from "../../types";

const ProgressLogCard = ({ log }: { log: ProgressLog }) => (
    <div className="border p-4 rounded-xl bg-white shadow-sm">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="text-md font-semibold">{log.label}</h3>
                <p className="text-sm text-gray-600">{log.date}</p>
            </div>
            <p className="text-xl font-bold text-blue-600">
                {log.value} {log.unit}
            </p>
        </div>
        <span className="inline-block text-xs bg-gray-100 mt-2 px-2 py-1 rounded text-gray-600">
            {log.type === "weight" ? "Bodyweight" : "Personal Record"}
        </span>
    </div>
);

export default ProgressLogCard;
