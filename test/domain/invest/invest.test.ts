import Customer, { Address, ClientType, Invest } from "../../../src/domain/customer";
import { Product } from "../../../src/domain/product";
import PersonClientPF from "../../../src/domain/useCases/invest/investClientPF";

describe("Suite test for invest domain layer", () => {
    let mockProduct: Product[];
    let mockAddress: Address;
    let mockInvest: Invest;
    let customer: Customer;
    let clientType: ClientType;

    beforeEach(() => {
        mockAddress = {city: "sao paulo", country: "brasil", number: "67", postalCode: "3222232", state: "sp", street: "rua dos bobos"} as Address;
        
        
        customer = {
            address: mockAddress,
            annualIncome: 2000,
            document: "12345678910",
            id: 1,
            name: "usuario windows",
            products: mockProduct,
            type: "PF",
            jurisdictionInvest: (value) => {
                return value;
            },
        } as Customer;
       
        mockProduct = [{ conditions: "cond_fake", customer, description: "qualquer descrição", id: 222, jurisdictionContract: true, maxInvestmentPercentage: 10, name: "fakeName", type: "PF"}] as Product[];
        
        
        mockInvest = {
            ruleInvest: jest.fn((value: number) => value * 2) // Mock implementation for ruleInvest
        };
    });

    it("should correctly instantiate the PersonClientPF object", () => {
        const personClient = new PersonClientPF(
            1,
            "John Doe",
            "PF",
            mockProduct,
            mockInvest,
            "123.456.789-00",
            50000,
            mockAddress
        );

        expect(personClient.id).toBe(1);
        expect(personClient.name).toBe("John Doe");
        expect(personClient.type).toBe("PF");
        expect(personClient.products).toEqual(mockProduct);
        expect(personClient.calculation).toBe(mockInvest);
        expect(personClient.annualIncome).toBe(50000);
        expect(personClient.address).toBe(mockAddress);
        expect(personClient.document).toBe("123.456.789-00");
    });

    it("should correctly calculate jurisdictionInvest", () => {
        const personClient = new PersonClientPF(
            1,
            "John Doe",
            "PF",
            mockProduct,
            mockInvest,
            "123.456.789-00",
            50000,
            mockAddress
        );

        const result = personClient.jurisdictionInvest(1000);

        expect(mockInvest.ruleInvest).toHaveBeenCalledWith(1000);
        expect(result).toBe(2000); 
    });

    it("should handle person Client PF", () => {
        const personClient = new PersonClientPF(
            1,
            "joazinho da silva ramos",
            "PF",
            mockProduct,
            mockInvest,
            "123.456.789-00",
            0,
            mockAddress
        );

        expect(personClient.annualIncome).toBe(0);
        expect(personClient.id).toBe(1);
        expect(personClient.type).toBe("PF");
        expect(personClient.name).toBe("joazinho da silva ramos");
        expect(personClient.products).toBe(mockProduct);
        expect(personClient.address).toBe(mockAddress);
    });
});
