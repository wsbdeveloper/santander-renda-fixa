import CustomerService from "../../../src/application/services/customer/customerService";
import Customer from "../../../src/domain/customer";
import CustomerManager from "../../../src/domain/useCases/customer/customerManager";

// Mocking the CustomerManager class
jest.mock("../../../src/domain/useCases/customer/customerManager");

describe("Suite test Customer Service LAYER", () => {
    let customerService: CustomerService;
    let mockCustomer: Customer;

    beforeEach(() => {
        customerService = new CustomerService();
        mockCustomer = { id: 1, name: "Test Customer", type: "PF", annualIncome: 100000, document: "12345678901" } as Customer;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a customer", () => {
        // Mocking addClient method
        (CustomerManager.prototype.addClient as jest.Mock).mockReturnValue(mockCustomer);

        const result = customerService.create(mockCustomer);
        expect(result).toBe(mockCustomer);
        expect(CustomerManager.prototype.addClient).toHaveBeenCalledWith(mockCustomer);
    });

    it("should get a customer by ID", () => {
        // Mocking getClientById method
        (CustomerManager.prototype.getClientById as jest.Mock).mockReturnValue(mockCustomer);

        const result = customerService.getById(1);
        expect(result).toBe(mockCustomer);
        expect(CustomerManager.prototype.getClientById).toHaveBeenCalledWith(1);
    });

    it("should update a customer", () => {
        const updatedCustomer = { name: "Updated Name" };
        // Mocking updateClient method
        (CustomerManager.prototype.updateClient as jest.Mock).mockReturnValue(updatedCustomer);

        const result = customerService.updated(1, updatedCustomer);
        expect(result).toBe(updatedCustomer);
        expect(CustomerManager.prototype.updateClient).toHaveBeenCalledWith(1, updatedCustomer);
    });

    it("should delete a customer", () => {
        // Mocking deleteClient method
        (CustomerManager.prototype.deleteClient as jest.Mock).mockReturnValue(true);

        const result = customerService.delete(1);
        expect(result).toBe(true);
        expect(CustomerManager.prototype.deleteClient).toHaveBeenCalledWith(1);
    });

    it("should list all customers", () => {
        // Mocking listClients method
        const customers = [mockCustomer];
        (CustomerManager.prototype.listClients as jest.Mock).mockReturnValue(customers);

        const result = customerService.listAll();
        expect(result).toBe(customers);
        expect(CustomerManager.prototype.listClients).toHaveBeenCalled();
    });
});
