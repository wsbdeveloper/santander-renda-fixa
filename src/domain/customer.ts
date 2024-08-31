import { Product } from "./product";

export type ClientType = 'PF' | 'PJ';

export default interface Customer {
    id: number;
    name: string;
    document: string,
    type: ClientType;
    annualIncome: number | undefined;
    address: Address;
    products: Product[];
    jurisdictionInvest(value: number): number;
}

export interface Address {
    street: string;       
    number: string;       
    city: string;         
    state: string;        
    postalCode: string;   
    country: string;      
}

export interface Invest {
    ruleInvest(value: number) : number;
}