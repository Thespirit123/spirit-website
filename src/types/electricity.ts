
export type Step = 1 | 2 | 3;

export interface Disco {
    meter_id: number;
    meter_company: string;
}

export interface CustomerInfo {
    name: string;
    address: string;
}

export interface ElectricityFormData {
    disco: Disco;
    meterType: "prepaid" | "postpaid";
    meterNumber: string;
    amount: number;
    customerInfo: CustomerInfo;
}

export interface TransactionResult {
    status: "success" | "failed";
    message: string;
    details: {
        transactionId: string;
        date: string;
        token?: string;
    } & Partial<ElectricityFormData>;
}