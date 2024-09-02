import Customer from "./customer";

export type ProductType = 'PF' | 'PJ';

export interface Product {
    id: number;
    name: string;
    type: ProductType;
    customer: Customer | undefined,
    description: string,
    conditions: string,
    maxInvestmentPercentage: number;
    jurisdictionContract: boolean
}

export interface ProductContract {
    idContract: number,
    clientId: number | undefined;
    productId: number;
    appliedValue: number | undefined;
    returnRate: number; // 0.05 for 5%
    maturityDate: Date;
}