interface DashboardCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  bgColor?: string;
}

const DashboardCard = ({ title, value, icon, bgColor }: DashboardCardProps) => {
  return (
    <div className={`rounded-xl shadow-md p-5 transition-transform transform hover:scale-[1.02] bg-white`}>
      <div className={`w-12 h-12 flex items-center justify-center rounded-full text-xl ${bgColor || "bg-gray-200"} text-gray-800`}>
        {icon}
      </div>
      <div className="mt-3">
        <h3 className="text-sm text-gray-500">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};
export default DashboardCard;