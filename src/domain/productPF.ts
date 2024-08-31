import { Invest } from "./customer";

export class ClientTypePF implements Invest {
    // TODO: testando valores para I do solid ajustar para calcular condição da tabela produtos
    ruleInvest(value: number): number {
        return value * 0.25;
    }
}