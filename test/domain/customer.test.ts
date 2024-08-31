import Customer, { Address, ClientType, Invest } from '../../src/domain/customer';
import { Product } from '../../src/domain/product';

describe('Customer Interface Tests', () => {
    let address: Address;
    let products: Product[];
    let customer: Customer;
    let invest: Invest;
    let clientType: ClientType;

    beforeAll(() => {
        // Setup the address object
        address = {
            street: "123 Main St",
            number: "456",
            city: "São Paulo",
            state: "SP",
            postalCode: "12345-678",
            country: "Brasil"
        };

        clientType = "PF" || "PJ"
        
        invest = {
            ruleInvest(value) {
                return value;
            }
        }
        products = [];

        customer = {
            id: 1,
            name: "Wellington",
            type: 'PF', // PF for Pessoa Física
            annualIncome: 50000,
            address: address,
            products: products,
            document: "4949494949-22",
            jurisdictionInvest: (value: number): number => {
                return value * 0.1;
            }
        };
    });

    it('should have a valid address', () => {
        expect(customer.address.city).toBe("São Paulo");
    });

    it('should calculate jurisdiction investment correctly', () => {
        const investment = customer.jurisdictionInvest(1000);
        expect(investment).toBe(100); // 10% of 1000 is 100
    });

    it('should have the correct customer type', () => {
        expect(customer.type).toBe('PF');
    });

    it('called the invest rule', () => {
        expect(invest.ruleInvest(1)).toBe(1);
    })

    it("called the type PF or PJ", () => {
        expect("PF" || "PJ").toContain(clientType);
    })
})