import { Request, Response } from 'express';
import Customer from '../../domain/customer';
import CustomerService from '../services/customer/customerService';
import ProductService from '../services/products';
import HandlerTypeUndefined from './exceptions/handlerTypeUndefined';

class ProductsController {
    private productsService: ProductService;
    private customerService: CustomerService;

    constructor(customer: Customer[] | undefined) {
        this.productsService = new ProductService(customer);
        this.customerService = new CustomerService();
    }

    createContractPF = async (req: Request<{ idCustomer: number}, {}, {}>, res: Response) => {
        try {
            const { idCustomer } = req.params;
            const createdContract = this.productsService.contractProductCustomerPF(idCustomer);
            const product = this.productsService.productPF;


            if (createdContract == undefined) return res.status(406).send();
            res.status(200).send({
                contract: createdContract,
                product: product
            });
        } catch (error) {
            if (error instanceof TypeError) {
                res.status(400).send(new HandlerTypeUndefined('Ocorreu um erro ao acessar propriedades: ' + error.message));
            } else {
                throw error;
            }
        }
    };

    createContractPJ = async (req: Request<{ idCustomer: number }>, res: Response) => {
        try {
            const { idCustomer } = req.params;
            const createdContract = this.productsService.contractProductCustomerPJ(idCustomer);
            const product = this.productsService.productPJ;


            if (createdContract == undefined) return res.status(406).send();
            res.status(200).send({
                contract: createdContract,
                product: product
            });
        } catch (error) {
            if (error instanceof TypeError) {
                res.status(400).send(new HandlerTypeUndefined('Ocorreu um erro ao acessar propriedades: ' + error.message));
            } else {
                throw error;
            }
        }
    };

    listContractsByCustomer = async (req: Request<{ idCustomer: number }, {}, {}>, res: Response) => {
        try {
            const { idCustomer } = req.params;
            const stateCustomer = this.productsService.listContractsCustomer(idCustomer);
            return stateCustomer === null
                ? res.status(400).send({ message: "Customer not found" })
                : res.status(200).send(stateCustomer);
        } catch (error) {
            if (error instanceof TypeError) {
                res.status(400).send(new HandlerTypeUndefined('Ocorreu um erro ao acessar propriedades: ' + error.message));
            } else {
                throw error;
            }
        }
    };

    cancelContractCustomer = async (req: Request<{ idContract: number, idCustomer: number }>, res: Response) => {
        try {
            const { idContract, idCustomer } = req.params;
            const deleted = this.productsService.cancelContractCustomer(idContract, idCustomer);
            return deleted === null
                ? res.status(400).send({ message: "Customer not found" })
                : res.status(200).send(deleted);
        } catch (error) {
            if (error instanceof TypeError) {
                res.status(400).send(new HandlerTypeUndefined('Ocorreu um erro ao acessar propriedades: ' + error.message));
            } else {
                throw error;
            }
        }
    };    
}

export default ProductsController;
