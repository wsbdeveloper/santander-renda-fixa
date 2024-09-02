// inMemoryDatabase.ts

import Customer from "../../domain/customer";
import logger from "./logger";

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
        logger.info(this.customers).info("customers");
        return this.customers.find(customer => Number(customer.id) === Number(id));
    }
}

export const inMemoryDatabase = new InMemoryDatabase();
