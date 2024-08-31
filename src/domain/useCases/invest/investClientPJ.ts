import Customer, { Address, ClientType, Invest } from "../../customer";
import { Product } from "../../product";

class PersonClientPJ implements Customer {
    id: number;
    name: string;
    type: ClientType;
    products: Product[];
    calculation: Invest;
    annualIncome: number | undefined;
    address: Address;
    document: string;

    constructor(id: number, name: string, type: ClientType, products: Product[], annualIncome: number, address: Address, invest: Invest, document: string) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.products = products;
        this.annualIncome = annualIncome;
        this.address = address;
        this.calculation = invest;
        this.document = document;
    }
    

    jurisdictionInvest(value: number): number {
        return this.calculation.ruleInvest(value);
    }

}

export default PersonClientPJ;