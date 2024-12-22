import { ApiClient } from './model/ApiClient';
import { AppData } from './model/AppData';
import { Basket } from './view/Basket';
import { Card } from './view/Card';
import { Contacts } from './view/Contacts';
import { Page } from './view/Page';
import { Success } from './view/Success';
import { Product, ContactData, OrderData } from '../types/index';

export class Presenter {
    private apiClient: ApiClient;
    private appData: AppData;
    private basketView: Basket;
    private cardView: Card;
    private contactsView: Contacts;
    private pageView: Page;
    private successView: Success;

    constructor(
        apiUrl: string,
        basketView: Basket,
        cardView: Card,
        contactsView: Contacts,
        pageView: Page,
        successView: Success
    ) {
        this.apiClient = new ApiClient(apiUrl);
        this.appData = new AppData();
        this.basketView = basketView;
        this.cardView = cardView;
        this.contactsView = contactsView;
        this.pageView = pageView;
        this.successView = successView;

        this.setupListeners();
    }

    // Настройка подписки на изменения данных
    private setupListeners(): void {
        // Обновление представлений при изменении продуктов
        this.appData.on('productsUpdated', (products: Product[]) => {
            this.pageView.updateBasketCounter(this.appData.getBasketItems().length);
            this.basketView.renderBasketItems(this.appData.getBasketItems().map(item => item.product));
        });

        // Обновление корзины при изменении данных
        this.appData.on('basketUpdated', () => {
            this.basketView.renderBasketItems(this.appData.getBasketItems().map(item => item.product));
            const totalPrice = this.appData.getBasketItems()
                .reduce((total, item) => total + item.product.price * item.quantity, 0);
            this.basketView.updateTotalPrice(totalPrice);
        });

        // Валидация данных контактов
        this.contactsView.onChange((data: ContactData) => {
            if (this.appData.validateUserData()) {
                console.log('Contact data valid:', data);
            } else {
                console.log('Contact data invalid');
            }
        });
    }

    // Загрузка списка продуктов
    async loadProducts(): Promise<void> {
        try {
            const products = await this.apiClient.fetchProducts();
            this.appData.setProducts(products);
        } catch (error) {
            console.error('Failed to load products:', error);
        }
    }

    // Загрузка деталей конкретного продукта
    async loadProductDetails(productId: number): Promise<void> {
        try {
            const product = await this.apiClient.fetchProductDetails(productId);
            this.cardView.setProductDetails(product);
        } catch (error) {
            console.error('Failed to load product details:', error);
        }
    }

    // Добавление продукта в корзину
    addToBasket(productId: number): void {
        try {
            this.appData.addToBasket(productId);
        } catch (error) {
            console.error('Failed to add product to basket:', error);
        }
    }

    // Оформление заказа
    async placeOrder(): Promise<void> {
        try {
            const orderData: OrderData = {
                products: this.appData.getBasketItems().map(item => item.product),
                address: this.contactsView.getContactData().email, // Используем email как пример
                paymentMethod: 'credit-card', // Заглушка для метода оплаты
            };
            await this.apiClient.sendOrder(orderData);
            this.successView.showSuccessMessage('Order placed successfully!');
            this.appData.saveUserData(this.contactsView.getContactData());
        } catch (error) {
            console.error('Failed to place order:', error);
        }
    }
}
