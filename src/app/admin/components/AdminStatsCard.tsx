import { ReactNode } from "react";

interface AdminStatsCardProps {
    title: string;
    value: number;
    icon: ReactNode;
}

export const AdminStatsCard = ({ title, value, icon }: AdminStatsCardProps) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-gray-500">{title}</h3>
                {icon}
            </div>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    );
};