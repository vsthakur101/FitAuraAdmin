interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

const DashboardCard = ({ title, value, icon }: DashboardCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 flex items-center justify-between hover:shadow-lg transition-all">
      <div>
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      {icon && <div className="text-3xl text-blue-500">{icon}</div>}
    </div>
  );
};

export default DashboardCard;
