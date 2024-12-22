import { ContactData, Product } from '../../types';
import { EventEmitter } from './EventEmitter';

export class AppData extends EventEmitter {
    private basket: Product[] = [];
    private products: Product[] = [];
    private userData: ContactData | null = null;

    setProducts(products: Product[]) {
        this.products = products;
        this.emit('productsUpdated', products);
    }

    addToBasket(productId: number) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.basket.push(product);
            this.emit('basketUpdated', this.basket);
        }
    }

    removeFromBasket(productId: number) {
        this.basket = this.basket.filter(p => p.id !== productId);
        this.emit('basketUpdated', this.basket);
    }

    saveUserData(userData: ContactData) {
        this.userData = userData;
        this.emit('userDataSaved', userData);
    }

    validateUserData(): boolean {
        if (!this.userData) return false;
        const { email, phone } = this.userData;
        return !!email && !!phone;
    }

    getBasketItems() {
        return this.basket.map(product => ({
            product, 
            quantity: 1, 
        }));
    }
}