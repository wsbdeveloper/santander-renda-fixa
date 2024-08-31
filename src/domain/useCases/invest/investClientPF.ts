
import Customer, { Address, ClientType, Invest } from "../../customer";
import { Product } from "../../product";

class PersonClientPF implements Customer {
    id: number;
    name: string;
    type: ClientType;
    document: string;
    products: Product[];
    calculation: Invest;
    annualIncome: number | undefined;
    address: Address;

    constructor(id: number, name: string, type: ClientType, products: Product[], invest: Invest, document: string, annualIncome: number, address: Address) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.products = products;
        this.calculation = invest;
        this.annualIncome = annualIncome;
        this.address = address;
        this.document = document;
    }

    jurisdictionInvest(value: number): number {
        return this.calculation.ruleInvest(value);
    }
}

export default PersonClientPF;

