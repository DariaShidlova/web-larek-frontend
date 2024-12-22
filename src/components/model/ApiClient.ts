import { OrderData } from "../../types";

export class ApiClient {
    constructor(private serverUrl: string = process.env.API_ORIGIN || 'https://default-api-url.com') {}

    async fetchProducts() {
        const response = await fetch(`${this.serverUrl}/products`);
        return response.json();
    }

    async fetchProductDetails(id: number) {
        const response = await fetch(`${this.serverUrl}/products/${id}`);
        return response.json();
    }

    async sendOrder(orderData: OrderData) {
        const response = await fetch(`${this.serverUrl}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        });
        return response.json();
    }
}