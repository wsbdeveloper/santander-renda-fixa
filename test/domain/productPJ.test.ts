import { ClientTypePF } from '../../src/domain/productPF';


describe("testing rule for customer PF", () => {

    let productPF: ClientTypePF;
    let calculation: number;
    let value = 2000;

    beforeAll(() => {
        productPF = new ClientTypePF();

        calculation = productPF.ruleInvest(value);
    })

    it("testing the calling rule productPF", () => {
        expect(calculation).toEqual(value * 0.25);
    })
})