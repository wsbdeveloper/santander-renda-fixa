import logger from "../../../application/utils/logger";
import Customer from "../../customer";

class CustomerManager {
    private clients: Customer[];

    constructor() {
        this.clients = [];
    }

    // Create
    addClient(client: Customer): Customer | undefined {
        let newCustomer = this.clients.push(client);
        let lastCustomer = newCustomer - 1;
        return this.clients[lastCustomer];
    }

    // Read
    getClientById(id: number): Customer | undefined {
        let findByID = this.clients.find((value) => value.id == id);
        if (findByID == undefined) {
            return undefined;
        }
        return findByID;
    }

    // Update
    updateClient(id: number, updatedClient: Partial<Customer>): boolean | Customer {
        const index = this.clients.findIndex(client => client.id === id);
        logger.info(index + " index");
        if (index !== -1) {
            this.clients[index] = { ...this.clients[index], ...updatedClient };
            return this.clients[index];
        }
        return false;
    }

    // Delete
    deleteClient(deleteid: number): boolean | Customer {
        let index = this.clients.find(client => Number(client.id) === Number(deleteid));

        
        if (Number(index) !== -1) {
            const deletedClient = this.clients[Number(index)];
            this.clients.splice(Number(index), 1);  // Remove the client from the list
            return deletedClient;
        }
        return false;
    }

    // List all clients
    listClients(): Customer[] {
        if (this.clients.length === 0) {
            logger.info("No clients found.");
        }
        return this.clients;
    }
}

export default CustomerManager;
