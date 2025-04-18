import React from 'react';

interface DashboardCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  isLoading?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, label, value, isLoading }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 flex items-center gap-4 hover:bg-gray-800 transition">
      <div className="p-2 rounded-full bg-white text-black">{icon}</div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        {isLoading ? (
          <div className="w-12 h-5 bg-gray-600 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-xl font-bold">{value}</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
