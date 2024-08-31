import Customer from "../../customer";
import { Product, ProductContract } from "../../product";

class ProductManager {
    private products: Product[] = [];
    private productContracts: ProductContract[] = [];

    
    addProduct(product: Product): void {
        this.products.push(product);
    }

    
    getProductById(id: number): Product | undefined {
        return this.products.find(product => product.id === id);
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

    
    createProductContract(contract: ProductContract, client: Customer | undefined): ProductContract | null {
        const product = this.getProductById(contract.productId);
        if (!product) return null;

        const totalApplied = this.productContracts
            .filter(customer => customer.clientId === contract.clientId && customer.productId === contract.productId)
            .reduce((count, customer) => count + (customer.appliedValue ?? 0), 0);

        if (client !== undefined) {
            const clientIncomePercentage = ((totalApplied + (contract.appliedValue ?? 0)) / (client.annualIncome ?? 1)) * 100;

            if (clientIncomePercentage <= product.maxInvestmentPercentage) {
                this.productContracts.push(contract);
                client.products.push(product);
                return contract;
            }
        }
        

        return null;
    }

    
    getContractsByClient(clientId: number): ProductContract[] {
        return this.productContracts.filter(contract => contract.clientId === clientId);
    }

    cancelContractByCustomer(clientId: number, contractId: number): boolean {
        let indexContract = this.productContracts.find(contracts => contracts.clientId === clientId && contracts.idContract === contractId);

        if (Number(indexContract) !== -1) {
            this.productContracts.splice(Number(indexContract), 1);
            return true;
        }

        return false;
    }
}

export default ProductManager;