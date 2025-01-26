import { AppDownloadConfig } from "@/types";
import Button from "./custom-ui/button";
import { Modal } from "./ui/modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  appConfig?: AppDownloadConfig;
}

export const SuccessModal = ({
  isOpen,
  onClose,
  email,
  appConfig,
}: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center p-6">
        <h3 className="text-xl font-semibold mb-4">Payment Successful!</h3>

        {appConfig?.downloadUrls ? (
          <>
            <p className="mb-4">Click below to download your app:</p>
            <div className="space-y-3">
              {appConfig.downloadUrls.android && (
                <Button
                  asLink
                  href={appConfig.downloadUrls.android}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full"
                >
                  Download Android App
                </Button>
              )}
              {appConfig.downloadUrls.ios && (
                <Button
                  asLink
                  href={appConfig.downloadUrls.ios}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  className="w-full"
                >
                  Download iOS App
                </Button>
              )}
            </div>
          </>
        ) : appConfig?.downloadUrl ? (
          <>
            <p className="mb-4">Click below to download your app:</p>
            <Button
              asLink
              href={appConfig.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              glow
            >
              Download App
            </Button>
          </>
        ) : appConfig?.instructions ? (
          <div className="text-left">
            <p className="mb-4">Follow these steps to access your iOS app:</p>
            <ul className="list-decimal pl-5 space-y-2">
              {appConfig.instructions.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-4 text-sm text-gray-600">
          Download link has been sent to: {email}
        </p>
      </div>
    </Modal>
  );
};
