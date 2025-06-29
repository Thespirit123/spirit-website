"use client";

import Button from "@/components/custom-ui/button";
import { EmailAuthProvider, reauthenticateWithCredential, User } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface RevalidateModalProps {
    user: User;
    onSuccess: () => void;
    onClose: () => void;
}

const RevalidateModal: React.FC<RevalidateModalProps> = ({ user, onSuccess, onClose }) => {
    const [password, setPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!user.email) {
            toast.error("No email found for user.");
            return;
        }

        setIsSubmitting(true);

        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Incorrect password. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md">
                <h2 className="text-lg font-semibold mb-4">Please enter your password to continue</h2>
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} isLoading={isSubmitting}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RevalidateModal;
