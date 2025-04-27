import { ClipboardCopy } from "lucide-react";
import toast from "react-hot-toast";

interface ReferralCodeProps {
  code: string;
  isLoading?: boolean;
}

export function ReferralCode({ code, isLoading }: ReferralCodeProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Referral code copied!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to copy code");
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
      <span className="text-gray-600">Referral Code</span>
      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <span className="font-mono text-sm sm:text-base select-all">
          {code}
        </span>
        <button
          onClick={copyToClipboard}
          className="focus:outline-none hover:text-gray-600 transition-colors"
          aria-label="Copy referral code"
        >
          <ClipboardCopy className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
