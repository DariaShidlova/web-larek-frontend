import { Product } from '../../types';
import { Component } from './Component';

export class Card extends Component {
    private productDetails: Product | null = null;

    setProductDetails(details: Product) {
        this.productDetails = details;
        this.render();
    }

    render() {
        if (!this.productDetails) return;
        this.element.innerHTML = `
            <div class="card">
                <h2>${this.productDetails.name}</h2>
                <p>${this.productDetails.description}</p>
                <button class="card__add-button">Купить</button>
            </div>
        `;
        this.bindEvents();
    }

    bindEvents() {
        const button = this.element.querySelector('.card__add-button');
        if (button) {
            button.addEventListener('click', () => {
                if (this.productDetails) {
                    this.element.dispatchEvent(new CustomEvent('addToBasket', {
                        detail: this.productDetails.id,
                        bubbles: true,
                    }));
                }
            });
        }
    }
}