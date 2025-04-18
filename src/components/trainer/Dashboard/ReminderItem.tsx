interface Props {
  title: string;
  time: string;
}

const ReminderItem: React.FC<Props> = ({ title, time }) => (
  <li className="text-sm border-b border-gray-800 pb-2">
    <p className="text-white font-semibold">{title}</p>
    <span className="text-gray-400">{time}</span>
  </li>
);

export default ReminderItem;
