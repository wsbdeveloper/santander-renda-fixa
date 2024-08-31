import Express from "express";
import CustomerController from "../controllers/customer";
import HealthCheck from "../controllers/healthcheck";

const router = Express.Router();
const controllerHealthcheck = new HealthCheck();
const customerController = new CustomerController();


router.get("/heathcheck", controllerHealthcheck.health);

router.post('/', customerController.addCustomer);
router.put('/', customerController.updatedCustomer);

router.get('/all', customerController.list);
router.get('/get/:id', customerController.getByIdCustomer);
router.delete('/:deleteid', customerController.deleteCustomer);


export default router;