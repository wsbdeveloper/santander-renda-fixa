import logger from "../../../application/utils/logger";
import Customer from "../../customer";
import { Product, ProductContract } from "../../product";

class ProductManager {
    private products: Product[] = [];
    private productContracts: ProductContract[] = [];
    private PF_THRESHOLD = 10;
    private PJ_THRESHOLD = 20;
    
    addProduct(product: Product): void {
        this.products.push(product);
    }
    
    getProductById(id: number): Product | undefined {
        return this.products.find(product => Number(product.id) === Number(id));
    }
    
    updateProduct(id: number, updatedProduct: Partial<Product>): boolean {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            return true;
        }
        return false;
    }
    
    deleteProduct(id: number): boolean {
        const initialLength = this.products.length;
        this.products = this.products.filter(product => product.id !== id);
        return this.products.length < initialLength;
    }
    
    listProducts(): Product[] {
        return this.products;
    }

    protected addContractToCustomer(contract : ProductContract) {
        this.productContracts.push(contract);
        logger.info(JSON.stringify(this.productContracts));
        return contract;
    }
    
    createProductContract(contract: ProductContract, client: Customer | undefined): ProductContract | null {
        const product = this.getProductById(contract.productId);
        if (!product) { throw Error("Product not found!") };

        if (client === undefined) {
            logger.info("client not found")
            throw new Error("Client not found")
        }

        if (this.getContractsByClient(client.id).length == 0) {
            return this.addContractToCustomer(contract)
        }

        const totalApplied = this.productContracts
            .filter(customer => customer.clientId === contract.clientId && customer.productId === contract.productId)
            .reduce((count, customer) => count + (customer.appliedValue ?? 0), 0);
        
        // calculo da porcentagem de investimentos do cliente.
        const clientIncomePercentage = ((totalApplied + (contract.appliedValue ?? 0)) / (client.annualIncome ?? 1)) * 100;
        if (client.type === "PJ" && clientIncomePercentage < this.PJ_THRESHOLD) {
            return this.addContractToCustomer(contract)
        } else if ((client.type === "PF") && (clientIncomePercentage < this.PF_THRESHOLD)) {
            return this.addContractToCustomer(contract)
        } else {
            const errorMessage = client.type === "PJ"
                ? "Investments not accepted for PJ clients with income percentage 20% or more!"
                : "Investments not accepted for PF clients with income percentage 10% or more!";

            throw new Error(errorMessage);
        }

    }
    
    getContractsByClient(clientId: number): ProductContract[] {
        return this.productContracts.filter(contract => Number(contract.clientId) === Number(clientId));
    }

    cancelContractByCustomer(clientId: number, contractId: number): boolean {
        let indexContract = this.productContracts.find(contracts => Number(contracts.clientId) === Number(clientId)
            && Number(contracts.idContract) === Number(contractId)
        );

        if (Number(indexContract) !== -1) {
            this.productContracts.splice(Number(indexContract), 1);
            return true;
        }

        return false;
    }
}

export default ProductManager;