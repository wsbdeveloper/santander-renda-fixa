import logger from "../../../src/application/utils/logger";
import Customer, { Address } from "../../../src/domain/customer";
import CustomerManager from "../../../src/domain/useCases/customer/customerManager";

jest.mock("../../../src/application/utils/logger");


describe('CustomerManager', () => {
    let customerManager: CustomerManager;
    let customer1: Customer;
    let customer2: Customer;
    let address: Address;
    
 
    beforeEach(() => {
        customerManager = new CustomerManager();
        address = {
            city: "sao paulo",
            country: "brasil",
            number: "43",
            postalCode: "xpto",
            state: "sao paulo",
            street: "rua dos bobos"
        }
        customer1 = { id: 1, name: "John Doe", address: address, annualIncome: 1233, jurisdictionInvest: jest.fn(), products: [], type: "PF"};
        customer2 = { id: 2, name: "Jane Doe 2", address: address, annualIncome: 1244, jurisdictionInvest: jest.fn(), products: [], type: "PJ" };
    });

    it('should add a client', () => {
        const addedClient = customerManager.addClient(customer1);
        expect(addedClient).toEqual(customer1);
        expect(customerManager.listClients()).toHaveLength(1);
    });

    it('should get a client by id', () => {
        customerManager.addClient(customer1);
        customerManager.addClient(customer2);

        const foundClient = customerManager.getClientById(1);
        expect(foundClient).toEqual(customer1);
    });

    it('should return undefined if client is not found by id', () => {
        const foundClient = customerManager.getClientById(99);
        expect(foundClient).toBeUndefined();
    });

    it('should update a client by id', () => {
        customerManager.addClient(customer1);
        const updatedData = { name: "John Updated" };
        const updatedClient = customerManager.updateClient(1, updatedData);

        expect(updatedClient).toMatchObject(updatedData);
        expect(customerManager.getClientById(1)).toEqual({ ...customer1, ...updatedData });
    });

    it('should return false if client to update is not found', () => {
        const result = customerManager.updateClient(99, { name: "Nonexistent" });
        expect(result).toBe(false);
    });

    it('should delete a client by id', () => {
        customerManager.addClient(customer1);
        customerManager.addClient(customer2);

        const deletedClient = customerManager.deleteClient(1);
        expect(deletedClient).toBeUndefined();
        expect(customerManager.listClients()).toHaveLength(1);
    });

    it('should return false if client to delete is not found', () => {
        const result = customerManager.deleteClient(99);
        expect(result).toBe(undefined);
    });

    it('should list all clients', () => {
        customerManager.addClient(customer1);
        customerManager.addClient(customer2);

        const clients = customerManager.listClients();
        expect(clients).toHaveLength(2);
    });

    it('should log a message if no clients are found when listing', () => {
        customerManager.listClients();
        expect(logger.info).toHaveBeenCalledWith("No clients found.");
    });
});