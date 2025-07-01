import { useEffect, useState } from "react";

interface DiscountState {
    isFirstTime: boolean;
    hasUsedDiscount: boolean;
    visitCount: number;
}

export const useFirstTimeDiscount = () => {
    const [discountState, setDiscountState] = useState<DiscountState>({
        isFirstTime: true,
        hasUsedDiscount: false,
        visitCount: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('spirit_discount_state');
        if (stored) {
            const parsed = JSON.parse(stored) as DiscountState;
            setDiscountState({
                ...parsed,
                visitCount: parsed.visitCount + 1,
            });
        } else {
            const newState = {
                isFirstTime: true,
                hasUsedDiscount: false,
                visitCount: 1,
            };
            localStorage.setItem('spirit_discount_state', JSON.stringify(newState));
            setDiscountState(newState);
        }
        setIsLoading(false);
    }, []);

    const markDiscountUsed = () => {
        const newState = {
            ...discountState,
            isFirstTime: false,
            hasUsedDiscount: true,
        };
        localStorage.setItem('spirit_discount_state', JSON.stringify(newState));
        setDiscountState(newState);
    };

    return {
        isFirstTimeUser: discountState.isFirstTime && !discountState.hasUsedDiscount,
        visitCount: discountState.visitCount,
        isLoading,
        markDiscountUsed,
    };
};