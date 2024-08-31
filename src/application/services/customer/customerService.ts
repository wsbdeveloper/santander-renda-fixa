import Customer from "../../../domain/customer";
import CustomerManager from "../../../domain/useCases/customer/customerManager";

class CustomerService {
    private customerManager: CustomerManager;

    constructor() {
        this.customerManager = new CustomerManager();
    }

    create(customer: Customer): Customer | undefined{
        return this.customerManager.addClient(customer);
    }

    getById(id: number): Customer | undefined {
        return this.customerManager.getClientById(id);
    }

    updated(id: number, customerParams: Partial<Customer>) : boolean | Partial<Customer> {
        return this.customerManager.updateClient(id, customerParams);
    }

    delete(deleteid: number) {
        return this.customerManager.deleteClient(deleteid);
    }

    listAll(): Customer[] {
        return this.customerManager.listClients();
    }
}

export default CustomerService;