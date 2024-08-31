import { Invest } from "./customer";

export default class ClientTypePJ implements Invest {
    ruleInvest(value: number): number {
        // TODO: testando valores para I do solid ajustar para calcular condição da tabela produtos
        return value * 0.50;
    }
}