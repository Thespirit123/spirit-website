import { formatDate } from "@/lib/utils";
import { Confession } from "@/services/confessions";
import { ClipboardIcon, X } from "lucide-react";
import { useCallback } from "react";
import toast from "react-hot-toast";

interface ConfessionModalProps {
    confession: Confession;
    onClose: () => void;
}

const ConfessionModal: React.FC<ConfessionModalProps> = ({
    confession,
    onClose,
}) => {

    const handleCopyToClipboard = useCallback(() => {
        navigator.clipboard
            .writeText(confession.content)
            .then(() => {
                toast.success("Confession copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy confession: ", err);
                toast.error("Failed to copy confession.");
            });
    }, [confession.content]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-2xl font-semibold">View Confession</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">ID: # {confession.id}</span>
                        <span>Created At: {formatDate(confession.createdAt)}</span>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-md mb-4 flex justify-between">
                        <p className="text-gray-800">{confession.content}</p>
                        <button className="mt-2 text-gray-500 hover:text-gray-700">
                            <ClipboardIcon className="w-6 h-6" onClick={handleCopyToClipboard} />
                        </button>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                            pending
                        </span>
                        <button
                            onClick={onClose}
                            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfessionModal;