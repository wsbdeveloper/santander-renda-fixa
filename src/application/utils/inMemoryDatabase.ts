// inMemoryDatabase.ts

import Customer from "../../domain/customer";

class InMemoryDatabase {
    private customers: Customer[] = [];

    addCustomer(customer: Customer | undefined): void {
        if (customer !== undefined) {
            this.customers.push(customer);
        }
    }

    getCustomers(): Customer[] | undefined {
        return this.customers;
    }

    getCustomerById(id: number): Customer | undefined {
        return this.customers.find(customer => customer.id === id);
    }
}

export const inMemoryDatabase = new InMemoryDatabase();
