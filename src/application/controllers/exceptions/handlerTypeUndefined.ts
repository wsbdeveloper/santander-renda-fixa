class HandlerTypeUndefined extends Error {
    private description: string;

    constructor(message: string) {
        super(message);
        this.name = 'Recursos não acessíveis!';
        this.description = "Erro ao acessar o recurso verifique se os dados estão cadastrados na plataforma";
    }

    toString(): string {
        return this.name;
    }
}

export default HandlerTypeUndefined;
