import express, { Express } from 'express';
import request from 'supertest';
import CustomerController from '../../../src/application/controllers/customer';
import { inMemoryDatabase } from '../../../src/application/utils/inMemoryDatabase';
import Customer, { Address } from '../../../src/domain/customer';

describe('CustomerController', () => {
    let app: Express;
    let mockCustomer: Customer;

    beforeAll(() => {
        app = express();
        app.use(express.json());

        const customerController = new CustomerController();

        // Rotas do controlador
        app.post('/customers', customerController.addCustomer);
        app.get('/customers/:id', customerController.getByIdCustomer);
        app.put('/customers', customerController.updatedCustomer);
        app.delete('/customers/:deleteid', customerController.deleteCustomer);
        app.get('/customers', customerController.list);
    });

    beforeEach(() => {
        mockCustomer = { id: 1, name: "Test Customer", type: "PF", annualIncome: 100000, document: "12345678901" } as Customer;
    });

    test('should add a new customer', async () => {
        const customerData = {
            id: 1,
            name: 'Carlos Silva',
            type: 'PF', document: "123.456.789-10",
            annualIncome: 20000,
            products: [],
            jurisdictionInvest: jest.fn(),
            address: {
                city: "sao paulo",
                country: "brasil",
                number: "2",
                postalCode: "233321",
                state: "sao paulo",
                street: "rua dos bobos"
            } as Address,
        } as Customer;

        const response = await request(app)
            .post('/customers')
            .send(customerData);

        expect(response.status).toBe(200);
    });

    test('should return customer by ID', async () => {
        const customerData = {
            id: 1,
            name: 'Carlos Silva',
            type: 'PF', document: "123.456.789-10",
            annualIncome: 20000,
            products: [],
            jurisdictionInvest: jest.fn(),
            address: {
                city: "sao paulo",
                country: "brasil",
                number: "2",
                postalCode: "233321",
                state: "sao paulo",
                street: "rua dos bobos"
            } as Address,
        } as Customer;

        inMemoryDatabase.addCustomer(customerData);

        const response = await request(app)
            .get('/customers/1');

        expect(response.status).toBe(200);
    });

    test('should update an existing customer', async () => {
        const customerData = {
            id: 1,
            name: 'Carlos Silva',
            type: 'PF', document: "123.456.789-10",
            annualIncome: 20000,
            products: [],
            jurisdictionInvest: jest.fn(),
            address: {
                city: "sao paulo",
                country: "brasil",
                number: "2",
                postalCode: "233321",
                state: "sao paulo",
                street: "rua dos bobos"
            } as Address,
        } as Customer;


        inMemoryDatabase.addCustomer(customerData);

        const updatedCustomer = {
            name: 'Carlos Henrique Silva',
        };

        const response = await request(app)
            .put('/customers')
            .send({ id: 1, customer: updatedCustomer });

        expect(response.status).toBe(200);
    });

    test('should delete a customer', async () => {
        const customerData = {
            id: 1,
            name: 'Carlos Silva',
            type: 'PF', document: "123.456.789-10",
            annualIncome: 20000,
            products: [],
            jurisdictionInvest: jest.fn(),
            address: {
                city: "sao paulo",
                country: "brasil",
                number: "2",
                postalCode: "233321",
                state: "sao paulo",
                street: "rua dos bobos"
            } as Address,
        } as Customer;


        inMemoryDatabase.addCustomer(customerData);

        const response = await request(app)
            .delete('/customers/1');

        expect(response.status).toBe(200);
    });

    test('should list all customers', async () => {
        const customerData1 = {
            id: 1,
            name: 'Carlos Silva',
            type: 'PF', document: "123.456.789-10",
            annualIncome: 20000,
            products: [],
            jurisdictionInvest: jest.fn(),
            address: {
                city: "sao paulo",
                country: "brasil",
                number: "2",
                postalCode: "233321",
                state: "sao paulo",
                street: "rua dos bobos"
            } as Address,
        } as Customer;


        const customerData2 = {
            id: 1,
            name: 'Maria Silva',
            type: 'PJ', document: "123.456.789-10",
            annualIncome: 40000,
            products: [],
            jurisdictionInvest: jest.fn(),
            address: {
                city: "sao paulo",
                country: "brasil",
                number: "2",
                postalCode: "233321",
                state: "sao paulo",
                street: "rua dos bobos"
            } as Address,
        } as Customer;


        inMemoryDatabase.addCustomer(customerData1);
        inMemoryDatabase.addCustomer(customerData2);

        const response = await request(app)
            .get('/customers');

        expect(response.status).toBe(200);
    });
});
