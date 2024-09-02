import Customer from "../../domain/customer";
import { Product, ProductContract } from "../../domain/product";
import ProductManager from "../../domain/useCases/product/productManager";
import { inMemoryDatabase } from "../utils/inMemoryDatabase";
import logger from "../utils/logger";

class ProductService {

    private productManager: ProductManager;
    public productPF: Product;
    public productPJ: Product;
    private customer: Customer[] | undefined
    private customerPF: Customer | undefined
    private customerPJ: Customer | undefined
    public productContractPF: ProductContract;
    public productContractPJ: ProductContract;

    constructor(customer: Customer[] | undefined) {
        this.productManager = new ProductManager();
        this.customerPF = customer!.find(data => data.type === "PF");
        this.customerPJ = customer!.find(data => data.type === "PJ");

        let idCustomerPF = this.customerPF?.id !== undefined ? this.customerPF.id : undefined;
        let idCustomerPJ = this.customerPJ?.id !== undefined ? this.customerPJ.id : undefined;
        
        this.productContractPF = {
            idContract: 44,
            appliedValue: 2000, // 10% renda anual do cliente simulado
            clientId: idCustomerPF, // identificador de simulação
            maturityDate: new Date(),
            productId: 1,
            returnRate: 0.10
        }

        logger.info(JSON.stringify(this.productContractPF))

        this.productContractPJ = {
            idContract: 444,
            appliedValue: 4000, // 20% renda anual do cliente simulado
            clientId: idCustomerPJ,
            maturityDate: new Date(),
            productId: 2,
            returnRate: 0.20
        }

        this.productPF = {
            customer: this.customerPF,
            description: "Valor Aplicado, Taxa de Retorno, Data de Vencimento",
            name: "RF-01",
            type: "PF",
            id: 1,
            conditions: "Valor Total Aplicado (todas aplicações para este cliente e produto) < 10% Renda Annual",
            maxInvestmentPercentage: 10,
            jurisdictionContract: true
        }

        this.productPJ = {
            customer: this.customerPJ, // Nome, CNPJ, Endereço, Faturamento Anual
            description: "Valor Aplicado, Taxa de Retorno, Data de Vencimento",
            name: "RF-02",
            type: "PJ",
            id: 2,
            conditions: "Valor Total Aplicado (todas aplicações para este cliente e produto) < 20% Faturamento Anual",
            maxInvestmentPercentage: 20,
            jurisdictionContract: true
        }


        this.productManager.addProduct(this.productPF);
        this.productManager.addProduct(this.productPJ);
    }

    private getCustomer(idCustomer: number) {
        const getCustomerById = inMemoryDatabase.getCustomerById(idCustomer);
        
        return getCustomerById;
    }

    contractProductCustomerPF(idCustomer: number): ProductContract | null {
        logger.info("Init contract customer PF");
        let client = this.getCustomer(idCustomer);
        
        // Inject cliente id request to domain layer customer
        this.productContractPF.clientId = Number(idCustomer);


        const newContract = this.productManager.createProductContract(this.productContractPF, client)
        logger.info(newContract); 
        
        if (newContract !== null && client?.products !== undefined) {
            let product = this.productManager.getProductById(newContract?.productId);

            if (product) {
                client.products.push(product);
                return newContract;
            }
            
        }
        
        return newContract;
    }

    contractProductCustomerPJ(idCustomer: number): ProductContract | null {
        logger.info("Init contract customerPF");
        let client = this.getCustomer(idCustomer);
        logger.info("cliente").info(JSON.stringify(client));

        // Inject cliente id request to domain layer customer
        this.productContractPJ.clientId = Number(idCustomer);


        const newContract = this.productManager.createProductContract(this.productContractPJ, client)
        logger.info(newContract);

        if (newContract !== null && client?.products !== undefined) {
            let product = this.productManager.getProductById(newContract?.productId);

            if (product) {
                client.products.push(product);
            }

        }

        return newContract;
    }

    listContractsCustomer(idCustomer: number): ProductContract[] {
        
        const listContractsByCustomer = this.productManager.getContractsByClient(idCustomer);
        return listContractsByCustomer;
    }

    cancelContractCustomer(idcontract: number, idCustomer: number) {
        return this.productManager.cancelContractByCustomer(this.getCustomer(idCustomer)!.id, idcontract);
    }
}
export default ProductService;