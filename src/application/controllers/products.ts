import { Request, Response } from 'express';
import Customer from '../../domain/customer';
import { ProductService } from '../services/products';
import logger from '../utils/logger';

class ProductsController {
    private productsService: ProductService;

    constructor(customer: Customer[] | undefined) {
        this.productsService = new ProductService(customer);
    }

    createContractPF = async (req: Request<{ idCustomer: number}, {}, {}>, res: Response) => {
        try {
            const { idCustomer } = req.params;
            const createdContract = this.productsService.contractProductCustomerPF(idCustomer);
            
            if (createdContract == undefined) return res.status(402).send();
            res.status(200).send(createdContract);
        } catch (error) {
            res.status(400).send("erro" + error);
        }
    };

    createContractPJ = async (req: Request<{ idCustomer: number }>, res: Response) => {
        try {
            const { idCustomer } = req.params;
            const createdContract = this.productsService.contractProductCustomerPJ(idCustomer);

            if (createdContract == undefined) return res.status(402).send();
            res.status(200).send(createdContract);
        } catch (error) {
            res.status(400).send("erro" + error);
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
            logger.error(error);
            res.status(400).send("erro" + error);
        }
    };

    cancelContractCustomer = async (req: Request<{ idContract: number, idCostumer: number }>, res: Response) => {
        try {
            const { idContract, idCostumer } = req.params;
            const deleted = this.productsService.cancelContractCustomer(idContract, idCostumer);
            return deleted === null
                ? res.status(400).send({ message: "Customer not found" })
                : res.status(200).send(deleted);
        } catch (error) {
            res.status(400).send("erro" + error);
        }
    };    
}

export default ProductsController;
