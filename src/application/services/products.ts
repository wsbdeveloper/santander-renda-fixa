import Customer from "../../domain/customer";
import { Product, ProductContract } from "../../domain/product";
import ProductManager from "../../domain/useCases/product/productManager";
import { inMemoryDatabase } from "../utils/inMemoryDatabase";

export class ProductService {

    private productManager: ProductManager;
    private productPF: Product;
    private productPJ: Product;
    private customer: Customer[] | undefined
    private customerPF: Customer | undefined
    private customerPJ: Customer | undefined
    private productContractPF: ProductContract;
    private productContractPJ: ProductContract;

    constructor(customer: Customer[] | undefined) {
        this.productManager = new ProductManager();
        this.customerPF = customer!.find(data => data.type === "PF");
        this.customerPJ = customer!.find(data => data.type === "PJ");

        this.productContractPF = {
            idContract: 44,
            appliedValue: this.customerPF?.annualIncome,
            clientId: 1,
            maturityDate: new Date(),
            productId: 1,
            returnRate: 0.10
        }

        this.productContractPJ = {
            idContract: 444,
            appliedValue: this.customerPJ?.annualIncome,
            clientId: 1,
            maturityDate: new Date(),
            productId: 1,
            returnRate: 0.20
        }

        this.productPF = {
            customer: this.customerPF,
            description: "Valor Aplicado, Taxa de Retorno, Data de Vencimento",
            name: "RF-01",
            type: "PF",
            id: 1,
            conditions: "Valor Total Aplicado (todas aplicações para este cliente e produto) < 10% Renda Annual",
            maxInvestmentPercentage: 300000,
            jurisdictionContract: true
        }

        this.productPJ = {
            customer: this.customerPJ, // Nome, CNPJ, Endereço, Faturamento Anual
            description: "Valor Aplicado, Taxa de Retorno, Data de Vencimento",
            name: "RF-02",
            type: "PJ",
            id: 2,
            conditions: "Valor Total Aplicado (todas aplicações para este cliente e produto) < 20% Faturamento Anual",
            maxInvestmentPercentage: 300000,
            jurisdictionContract: true
        }


        this.productManager.addProduct(this.productPF);
        this.productManager.addProduct(this.productPJ);
    }

    private getCustomer(idCustomer: number) {
        const getCustomerById = inMemoryDatabase.getCustomerById(idCustomer);
        return this.customer?.find(data => data.id === getCustomerById?.id);
    }

    contractProductCustomerPF(idCustomer: number): ProductContract | null {
        
        const newContract = this.productManager.createProductContract(this.productContractPF, this.getCustomer(idCustomer))

        return newContract;
    }

    contractProductCustomerPJ(idCustomer: number): ProductContract | null {
        const newContract = this.productManager.createProductContract(this.productContractPJ, this.getCustomer(idCustomer))

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