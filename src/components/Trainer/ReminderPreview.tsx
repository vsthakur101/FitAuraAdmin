type Reminder = {
  clientName: string;
  date: string;
  time: string;
};

interface ReminderPreviewProps {
  reminders: Reminder[];
}

const ReminderPreview = ({ reminders }: ReminderPreviewProps) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
      {reminders.length === 0 ? (
        <p className="text-gray-500">No sessions scheduled.</p>
      ) : (
        <ul className="space-y-2">
          {reminders.map((reminder, index) => (
            <li key={index} className="border-b pb-2">
              <div className="text-sm font-medium">{reminder.clientName}</div>
              <div className="text-xs text-gray-500">
                {reminder.date} at {reminder.time}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReminderPreview;
