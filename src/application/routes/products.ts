import Express from "express";
import Customer from "../../domain/customer";
import ProductsController from "../controllers/products";
import { inMemoryDatabase } from "../utils/inMemoryDatabase";

const router = Express.Router();
const customer: Customer[] | undefined = inMemoryDatabase.getCustomers();
const productsController = new ProductsController(customer);

// endpoint: /products
router.post('/pf/:idCustomer', productsController.createContractPF);
router.post('/pj/:idCustomer', productsController.createContractPJ);
router.get('/contracts/:idCustomer', productsController.listContractsByCustomer);
router.delete('/cancel/:idContract/:idCustomer', productsController.cancelContractCustomer);


export default router;