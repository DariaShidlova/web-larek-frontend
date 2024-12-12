import { Product } from './index';
import { basketManager } from './basket';
import { productModal } from './modal';
import { API_URL } from '../utils/constants';

export class Catalog {
    private catalogElement: HTMLElement;

    constructor(catalogSelector: string) {
        this.catalogElement = document.querySelector(catalogSelector) as HTMLElement;
        this.loadProducts();
    }

    // Загрузить товары в каталог
    private async loadProducts(): Promise<void> {
        const products: Product[] = await this.fetchProducts();
        this.renderProducts(products);
    }

    // Получить список товаров с API
    private async fetchProducts(): Promise<Product[]> {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();
        return data.items;
    }

    // Отобразить товары
    private renderProducts(products: Product[]): void {
        const template = document.getElementById('card-catalog') as HTMLTemplateElement;

        products.forEach(product => {
            const productElement = template.content.cloneNode(true) as HTMLElement;
            const title = productElement.querySelector('.card__title') as HTMLElement;
            const price = productElement.querySelector('.card__price') as HTMLElement;
            const image = productElement.querySelector('.card__image') as HTMLImageElement;
            const button = productElement.querySelector('.card__button') as HTMLButtonElement;

            title.textContent = product.title;
            price.textContent = `${product.price} синапсов`;
            image.src = product.imageUrl;

            button.addEventListener('click', () => {
                basketManager.addProduct(product);
                productModal.open();
            });

            this.catalogElement.appendChild(productElement);
        });
    }
}

new Catalog('.gallery');
