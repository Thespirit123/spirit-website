import "flutterwave-react-v3";

declare module "flutterwave-react-v3/dist/types" {
  interface FlutterWaveResponse {
    amount: number;
    created_at: string;
    currency: string;
    charge_response_code: string;
    charge_response_message: string;
    charged_amount: number;
    customer: {
      email: string;
      phone_number: string;
      name: string;
    };
    flw_ref: string;
    status: "successful" | "failed" | "cancelled";
    transaction_id: number;
    tx_ref: string;
  }
}
