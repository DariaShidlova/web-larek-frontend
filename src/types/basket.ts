
import { Basket, BasketItem, Product } from './index';

//класс для управления корзиной
class BasketManager {
    private basket: Basket = [];//хранит текущее состояние корзины

    constructor() {
        // Получаем корзину из localStorage или создаём новую
        const savedBasket = localStorage.getItem('basket');
        if (savedBasket) {
            this.basket = JSON.parse(savedBasket);
        }
    }

    // Добавление товара в корзину
    addProduct(product: Product): void {
        const existingItem = this.basket.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.basket.push({ ...product, quantity: 1 });
        }
        this.saveBasket();
    }

    // Удаление товара из корзины
    //Продукты с id, равным productId, удаляются из корзины с помощью метода filter
    removeProduct(productId: number): void {
        this.basket = this.basket.filter(item => item.id !== productId);
        this.saveBasket();//сохранение корзины
    }

    // Получение корзины
    getBasket(): Basket {
        return this.basket;
    }

    // Считаем общую стоимость товаров в корзине
    getTotalPrice(): number {
        return this.basket.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Сохранение корзины в localStorage
    private saveBasket(): void {
        localStorage.setItem('basket', JSON.stringify(this.basket));
    }
}

export const basketManager = new BasketManager();
