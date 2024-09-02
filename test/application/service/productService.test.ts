import ProductService from '../../../src/application/services/products';
import { inMemoryDatabase } from '../../../src/application/utils/inMemoryDatabase';
import Customer, { Address } from '../../../src/domain/customer';

describe('ProductService', () => {
    let productService: ProductService;
    let mockCustomers: Customer[];
    let address: Address;

    beforeEach(() => {
        // Mock database
        address = {
            street: "123 Main St",
            number: "456",
            city: "São Paulo",
            state: "SP",
            postalCode: "12345-678",
            country: "Brasil"
        };

        mockCustomers = [
            {
                id: 1,
                name: 'Customer 1',
                type: 'PF',
                annualIncome: 20000,
                products: [],
                address,
                document: "123.456.434-66",
                jurisdictionInvest: jest.fn()
            },
            {
                id: 2,
                name: 'Customer 2',
                type: 'PJ',
                annualIncome: 20000,
                products: [],
                address,
                document: "12.345.678/0001-95",
                jurisdictionInvest: jest.fn()
            }
        ];

        // Mock inMemoryDatabase functions
        inMemoryDatabase.getCustomerById = jest.fn((id) => mockCustomers.find(customer => customer.id === id));

        productService = new ProductService(mockCustomers);
    });

    it('should create a new contract for a PF customer', () => {
        const contract = productService.contractProductCustomerPF(1);
        expect(contract).not.toBeNull();
        expect(contract!.clientId).toBe(1);
        expect(contract!.appliedValue).toBe(2000); // 10% of annual income
    });

    it('should throw an error when trying to create a contract that exceeds the allowed investment for PF', () => {
        productService.productContractPF.appliedValue = 3000;
        productService.contractProductCustomerPF(1); // Exceeds 10% of annual income
        expect(() => {
            
            productService.contractProductCustomerPF(1);
        }).toThrow('Investments not accepted for PF clients with income percentage 10% or more!');
    });

    it('should create a new contract for a PJ customer', () => {
        const contract = productService.contractProductCustomerPJ(2);
        expect(contract).not.toBeNull();
        expect(contract!.clientId).toBe(2);
        expect(contract!.appliedValue).toBe(4000); // 20% of annual income
    });

    it('should return all contracts for a customer', () => {
        productService.contractProductCustomerPF(1);
        const contracts = productService.listContractsCustomer(1);
        expect(contracts.length).toBe(1);
        expect(contracts[0].clientId).toBe(1);
    });

    it('should cancel a contract for a customer', () => {
        const contract = productService.contractProductCustomerPF(1);
        expect(contract).not.toBeNull();
        const cancelResult = productService.cancelContractCustomer(contract!.idContract, 1);
        expect(cancelResult).toBeTruthy();
        const contracts = productService.listContractsCustomer(1);
        expect(contracts.length).toBe(0);
    });
});
