export interface CableCompany {
    id: string;
    name: string;
    apiId: string;
}

export interface CablePlan {
    cable_id: number;
    cable_company: string;
    cable_plan_name: string;
    price: string;
    status: string;
}

export interface CustomerInfo {
    cable_id: string;
    cable_company: string;
    cable_number: string;
    customer_name: string;
    current_plan: string;
}

export interface CableFormData {
    company: CableCompany;
    plan: CablePlan;
    cableNumber: string;
    customerInfo: CustomerInfo;
    amount: number;
}

export interface CableTransactionResult {
    status: "success" | "failed";
    message: string;
    details: CableFormData & {
        transactionId: string;
        date: string;
    };
}