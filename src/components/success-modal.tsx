import { CheckCircle2 } from "lucide-react";
import { Text } from "./custom-ui/text";
import { Modal, ModalBody } from "./ui/modal";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const SuccessModal = ({ isOpen, onClose, email }: SuccessModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBody className="p-6 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <Text variant="h2" className="text-2xl font-semibold mb-4">
          Payment Successful!
        </Text>
        <div className="space-y-4 text-gray-600">
          <p>
            Thank you for your purchase. A receipt has been sent to{" "}
            <span className="font-medium">{email}</span>
          </p>
          <p>
            Our team will process your order and reach out to you shortly with
            next steps.
          </p>
          <p className="text-sm">
            For urgent inquiries, contact us on WhatsApp
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};
