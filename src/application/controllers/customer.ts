import { Request, Response } from 'express';
import Customer from '../../domain/customer';
import CustomerService from '../services/customer/customerService';
import { inMemoryDatabase } from '../utils/inMemoryDatabase';
import logger from '../utils/logger';
import CustomerRequestBody from './dtos/customerRequestBody';

class CustomerController {
    private customerService: CustomerService;

    constructor() {
        this.customerService = new CustomerService();
    }

    addCustomer = async (req: Request<{}, {}, CustomerRequestBody>, res: Response) => {
        try {
            const createdCustomer = this.customerService.create({ ...req.body });
            logger.info(createdCustomer)
            inMemoryDatabase.addCustomer(createdCustomer);
            res.status(200).send(createdCustomer);
        } catch (error) {
            res.status(400).send("erro" + error);
        }
    };

    getByIdCustomer = async (req: Request<{ id: number }>, res: Response) => {
        try {
            const { id } = req.params;
            const customer = this.customerService.getById(id);

            if (customer == undefined) return res.status(404).send();
            res.status(200).send(customer);
        } catch (error) {
            res.status(400).send("erro" + error);
        }
    };

    updatedCustomer = async (req: Request<{}, {}, { id: number; customer: Partial<Customer> }>, res: Response) => {
        try {
            const { id, customer } = req.body;
            const stateCustomer = this.customerService.updated(id, customer);
            return stateCustomer === false
                ? res.status(400).send({ message: "Customer not found" })
                : res.status(200).send(stateCustomer);
        } catch (error) {
            logger.error(error);
            res.status(400).send("erro" + error);
        }
    };

    deleteCustomer = async (req: Request<{ deleteid: number }>, res: Response) => {
        try {
            const { deleteid } = req.params;
            const deleted = this.customerService.delete(deleteid);
            logger.info("deleted? : ", deleted);
            res.status(200).send(deleted);
        } catch (error) {
            res.status(400).send("erro" + error);
        }
    };

    list = async (req: Request, res: Response) => {
        const allCustomer = this.customerService.listAll();
        res.status(200).send(allCustomer)
    }
}

export default CustomerController;
