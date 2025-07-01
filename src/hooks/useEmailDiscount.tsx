import { useState } from "react";

export const useEmailDiscount = () => {
    const [isCheckingEmail, setIsCheckingEmail] = useState(false);
    const [isFirstTimeEmail, setIsFirstTimeEmail] = useState(false);

    const checkEmailDiscount = async (email: string): Promise<boolean> => {
        setIsCheckingEmail(true);
        try {
            const response = await fetch('/api/check-email-discount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const { isFirstTime } = await response.json();
            setIsFirstTimeEmail(isFirstTime);
            return isFirstTime;
        } catch (error) {
            console.error('Error checking email discount:', error);
            return false;
        } finally {
            setIsCheckingEmail(false);
        }
    };

    return {
        isCheckingEmail,
        isFirstTimeEmail,
        checkEmailDiscount,
    };
};