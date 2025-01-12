import { Card } from "./Card";
import { ICardPreview, Product } from "../../types";
import { IEvents } from "../base/events";

export class ProductCardPreview extends Card implements ICardPreview {
  text: HTMLElement;          
  button: HTMLButtonElement;  

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    super(template, () => this.handleAddToBasket());
  // super(template, () => events.emit('card:addBasket')); // Передача события в родительский класс
    this.text = this.cardElement.querySelector('.card__text');
    this.button = this.cardElement.querySelector('.card__button');
  }

  private handleAddToBasket(): void {
    // Проверка, активна ли кнопка (цена должна быть указана)
    if (!this.button.disabled) {
      this.events.emit('card:addBasket'); // Событие добавления в корзину
    }
  }

  // Метод для проверки наличия цены и установки состояния кнопки
  private getButtonLabel(data: Product): string {
    return data.price ? "Купить" : "Не продается";
  }

  // Метод для рендеринга карточки товара с переданными данными
  render(data: Product): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.renderTitle(this.cardTitle, data.title);
    this.cardImage.src = data.image;
    this.cardImage.alt = data.title;
    this.renderPrice(this.cardPrice, data.price);
    this.text.textContent = data.description;
    
    this.button.textContent = this.getButtonLabel(data);
    this.button.disabled = data.price === null; // Блокировка кнопки, если цена отсутствует

    return this.cardElement;
  }
}
