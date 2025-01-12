import { Product } from "../../types";
import { ProductRender } from './ProductRender';

export class Card extends ProductRender {
  cardElement: HTMLElement;
  cardCategory: HTMLElement;
  cardTitle: HTMLElement;
  cardImage: HTMLImageElement;
  cardPrice: HTMLElement;
  // cardButton: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, onOpenModal: () => void) {
    super();

    this.cardElement = template.content.querySelector(".card").cloneNode(true) as HTMLElement;
    this.cardCategory = this.cardElement.querySelector(".card__category");
    this.cardTitle = this.cardElement.querySelector(".card__title");
    this.cardImage = this.cardElement.querySelector(".card__image");
    this.cardPrice = this.cardElement.querySelector(".card__price");

     // Проверяем наличие кнопки внутри карточки
     const button = this.cardElement.querySelector(".card__button");
     if (button) {
       // Если кнопка найдена, добавляем обработчик на нее
       button.addEventListener("click", onOpenModal);
     } else {
       // Если кнопка не найдена, обработчик вешается на весь контейнер
       this.cardElement.addEventListener("click", onOpenModal);
     }
    
  }

  render(data: Product): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.renderTitle(this.cardTitle, data.title);
    this.cardImage.src = data.image;
    this.cardImage.alt = data.title;
    this.renderPrice(this.cardPrice, data.price);
    return this.cardElement;
  }
}
   
  


