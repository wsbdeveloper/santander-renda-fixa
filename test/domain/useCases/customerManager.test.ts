import Customer from "../../../src/domain/customer";
import { Product, ProductContract } from "../../../src/domain/product";
import ProductManager from "../../../src/domain/useCases/product/productManager";


describe("ProductManager", () => {
    let productManager: ProductManager;
    let mockProduct: Product;
    let mockContract: ProductContract;
    let mockCustomer: Customer;

    beforeEach(() => {
        productManager = new ProductManager();

        // Mock product and customer data
        mockProduct = { id: 1, name: "Test Product" } as Product;
        mockContract = { idContract: 1, productId: 1, clientId: 1, appliedValue: 5000 } as ProductContract;
        mockCustomer = { id: 1, name: "Test Customer", type: "PF", annualIncome: 100000, document: "12345678901" } as Customer;
    });

    it("should add a product", () => {
        productManager.addProduct(mockProduct);

        expect(productManager.listProducts()).toContain(mockProduct);
    });

    it("should get a product by ID", () => {
        productManager.addProduct(mockProduct);

        const product = productManager.getProductById(1);
        expect(product).toBe(mockProduct);
    });

    it("should update a product", () => {
        productManager.addProduct(mockProduct);

        const updatedProduct = { name: "Updated Product" };
        const result = productManager.updateProduct(1, updatedProduct);

        expect(result).toBe(true);
        expect(productManager.getProductById(1)?.name).toBe("Updated Product");
    });

    it("should delete a product", () => {
        productManager.addProduct(mockProduct);

        const result = productManager.deleteProduct(1);

        expect(result).toBe(true);
        expect(productManager.getProductById(1)).toBeUndefined();
    });

    it("should create a product contract for a PF client with valid income percentage", () => {
        productManager.addProduct(mockProduct);

        const contract = productManager.createProductContract(mockContract, mockCustomer);

        expect(contract).toBe(mockContract);
    });

    it("should throw an error when trying to create a product contract with a PF client and high income percentage", () => {
        productManager.addProduct(mockProduct);
        productManager.addProduct(mockProduct);
        mockContract.appliedValue = 15000; // Increase applied value to exceed the PF threshold
        productManager.createProductContract(mockContract, mockCustomer)
        expect(() => { productManager.createProductContract(mockContract, mockCustomer) }).toThrow("Investments not accepted for PF clients with income percentage 10% or more!");
    });

    it("should get contracts by client ID", () => {
        productManager.addProduct(mockProduct);
        productManager.createProductContract(mockContract, mockCustomer);

        const contracts = productManager.getContractsByClient(1);

        expect(contracts).toContain(mockContract);
    });

    it("should cancel a contract by customer ID and contract ID", () => {
        productManager.addProduct(mockProduct);
        productManager.createProductContract(mockContract, mockCustomer);

        const result = productManager.cancelContractByCustomer(1, 1);

        expect(result).toBe(true);
        expect(productManager.getContractsByClient(1)).not.toContain(mockContract);
    });

    it("should return null when trying to create a contract for a non-existent product", () => {
        expect(() => { productManager.createProductContract(mockContract, mockCustomer) }).toThrow("Product not found!");
    });

    it("should throw an error when the client is undefined", () => {
        expect(() => { productManager.createProductContract(mockContract, undefined) }).toThrow("Product not found!");
    });
});
