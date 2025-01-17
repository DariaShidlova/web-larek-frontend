import { IBasket, Product } from "../../types";
import { createElement, cloneTemplate, ensureElement, isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";
import { BasketItem } from "./BasketItem";

export class Basket implements IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLElement;

    constructor(template: string | HTMLTemplateElement, protected events: IEvents) {
        this.basket = cloneTemplate<HTMLElement>(template);

        this.title = ensureElement<HTMLElement>(".modal__title", this.basket);
        this.basketList = ensureElement<HTMLElement>(".basket__list", this.basket);
        this.button = ensureElement<HTMLButtonElement>(".basket__button", this.basket);
        this.basketPrice = ensureElement<HTMLElement>(".basket__price", this.basket);

        this.button.addEventListener("click", () => this.events.emit("order:open"));

        this.events.on('basket:updated', (basket: Product[]) => {
        this.updateBasketView(basket);
      });
  
        this.items = [];
        
    }
    
    private updateBasketView(basket: Product[]): void {
        const items = basket.map((product, index) => {
            const onDelete = () => {
                this.events.emit('basket:remove', product);
            };

            const basketItem = new BasketItem(this.basket.querySelector('#card-basket') as HTMLTemplateElement, onDelete);
            return basketItem.render(product, index + 1); 
        });

        this.items = items;
        this.renderSumAllProducts(basket.reduce((sum, item) => sum + item.price, 0));
    }

    set items(items: HTMLElement[]) {
        if (items.length > 0) {
            this.basketList.replaceChildren(...items);
            this.button.removeAttribute("disabled");
        } else {
            this.basketList.replaceChildren(createElement<HTMLParagraphElement>("p", { textContent: "Корзина пуста" }));
            this.button.setAttribute("disabled", "disabled");
        }
    }

    renderSumAllProducts(sumAll: number): void {
        this.basketPrice.textContent = `${sumAll} синапсов`;
    }

    render() {
        return this.basket;
    }
}
