import { IBasket } from "../../types";
import { createElement, cloneTemplate, ensureElement, isEmpty } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Basket implements IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLElement;
    headerBasketButton: HTMLButtonElement;
    headerBasketCounter: HTMLElement;

    constructor(template: string | HTMLTemplateElement, container: HTMLElement, protected events: IEvents) {
        // Клонируем шаблон корзины
        this.basket = cloneTemplate<HTMLElement>(template);

        // Привязываем элементы корзины с использованием ensureElement
        this.title = ensureElement<HTMLElement>(".modal__title", this.basket);
        this.basketList = ensureElement<HTMLElement>(".basket__list", this.basket);
        this.button = ensureElement<HTMLButtonElement>(".basket__button", this.basket);
        this.basketPrice = ensureElement<HTMLElement>(".basket__price", this.basket);

        this.headerBasketButton = ensureElement<HTMLButtonElement>(".header__basket", container);
        this.headerBasketCounter = ensureElement<HTMLElement>(".header__basket-counter", container);

        // Установка обработчиков событий
        this.button.addEventListener("click", () => this.events.emit("order:open"));
        this.headerBasketButton.addEventListener("click", () => this.events.emit("basket:open"));

        this.items = [];
    }

    // Сеттер для установки товаров в корзине
    set items(items: HTMLElement[]) {
        if (items.length > 0) {
            // Замена списка товаров
            this.basketList.replaceChildren(...items);
            this.button.removeAttribute("disabled");
        } else {
            // Если корзина пуста
            this.basketList.replaceChildren(createElement<HTMLParagraphElement>("p", { textContent: "Корзина пуста" }));
            this.button.setAttribute("disabled", "disabled");
        }
    }

    // Обновление счётчика товаров
    renderHeaderBasketCounter(value: number): void {
        // if (isEmpty(value)) {
        //     throw new Error("Счётчик товаров не может быть пустым");
        // }
        this.headerBasketCounter.textContent = String(value);
    }

    // Обновление общей стоимости товаров
    renderSumAllProducts(sumAll: number): void {
        // if (isEmpty(sumAll)) {
        //     throw new Error("Общая сумма не может быть пустой");
        // }
        this.basketPrice.textContent = `${sumAll} синапсов`;
    }

    // Рендеринг корзины
    render() {
        // this.title.textContent = "Корзина";
        return this.basket;
    }
}
