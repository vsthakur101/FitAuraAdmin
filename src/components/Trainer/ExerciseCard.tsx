import { Exercise } from "../../types";

const ExerciseCard = ({ ex }: { ex: Exercise }) => (
    <div className="border p-4 rounded-xl bg-white shadow-sm">
        <h3 className="font-semibold text-lg">{ex.label}</h3>
        <p className="text-sm text-gray-600">
            {ex.sets} sets × {ex.reps} reps
        </p>
        <p className="text-xs text-gray-500">Rest: {ex.rest}</p>
    </div>
);

export default ExerciseCard;
