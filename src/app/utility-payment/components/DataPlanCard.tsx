"use client";

import Button from '@/components/custom-ui/button';
import { useAuth } from '@/hooks/useAuth';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface DataPlan {
    data: string;
    price: string;
    days: string;
}

interface DataPlanCardProps {
    networkName: string;
    networkLogo: StaticImageData;
    cardColor: string;
    textColor?: string;
    plans: DataPlan[];
}

const DataPlanCard: React.FC<DataPlanCardProps> = ({
    networkName,
    networkLogo,
    cardColor,
    textColor = 'text-black',
    plans,
}) => {
    const { user } = useAuth();
    const router = useRouter();

    const handleBuyNowClick = () => {
        if (user) {
            router.push('/utilities/airtime');
        } else {
            router.push('/auth/login');
        }
    };

    return (
        <div className={`${cardColor} shadow-lg transition-shadow rounded-lg overflow-hidden flex flex-col`}>
            <div>
                <div className="flex items-center justify-center mb-4 pt-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <Image src={networkLogo} alt={`${networkName} Logo`} width={32} height={32} style={{ objectFit: 'contain' }} />
                    </div>
                </div>
                <p className={`text-center font-bold mb-6 ${textColor}`}>{networkName}</p>
            </div>

            <div className="bg-white p-4 md:p-6 flex-grow flex flex-col">
                <table className="w-full text-sm">
                    <thead className="sr-only">
                        <tr>
                            <th>Data</th>
                            <th>Price</th>
                            <th>Validity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan, index) => (
                            <tr key={index} className="border-b border-gray-100 last:border-b-0">
                                <td className="py-2 font-medium text-gray-800 text-left">{plan.data}</td>
                                <td className="py-2 font-bold text-[#008EA8] text-center">{plan.price}</td>
                                <td className="py-2 text-xs text-gray-600 text-right">{plan.days}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-auto pt-4">
                    <Button
                        onClick={handleBuyNowClick}
                        variant="primary"
                        size="sm"
                        fullWidth
                    >
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DataPlanCard;