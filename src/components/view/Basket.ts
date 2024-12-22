import { Product } from '../../types';
import { Component } from './Component';

export class Basket extends Component {
    private items: Product[] = [];

    renderBasketItems(items: Product[]) {
        this.items = items;
        this.render();
    }

    updateTotalPrice(price: number) {
        const priceElement = this.element.querySelector('.basket__price');
        if (priceElement) priceElement.textContent = `${price} синапсов`;
    }

    clearBasket() {
        this.items = [];
        this.render();
    }

    render() {
        const list = this.element.querySelector('.basket__list');
        if (!list) return;
        list.innerHTML = this.items.map((item, index) => `
            <li class="basket__item">
                <span>${index + 1}</span>
                <span>${item.name}</span>
                <span>${item.price} синапсов</span>
            </li>
        `).join('');
    }
}
