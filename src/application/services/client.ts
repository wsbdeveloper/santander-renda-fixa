import Client from '../../domain/customer';
import { Product } from '../../domain/product';

export class ClientService {
    private clients: Client[] = [];

    addProductToClient(clientId: number, product: Product): boolean {
        const client = this.clients.find(c => c.id === clientId);
        if (!client) {
            throw new Error('Client not found');
        }

        if ((client.type === 'PF' && product.type === 'PJ') ||
            (client.type === 'PJ' && product.type === 'PF')) {
            throw new Error('Product type not allowed for this client');
        }

        client.products.push(product);
        return true;
    }
}
