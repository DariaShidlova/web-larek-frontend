import { Card } from "./Card";
import { ICardPreview, Product } from "../../types";
import { IEvents } from "../base/events";

export class ProductCardPreview extends Card implements ICardPreview {
  text: HTMLElement;          
  button: HTMLButtonElement;  

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    super(template, () => this.handleAddToBasket());
    this.text = this.cardElement.querySelector('.card__text');
    this.button = this.cardElement.querySelector('.card__button');
  }

  private handleAddToBasket(): void {
    if (!this.button.disabled) {
      this.events.emit('card:addBasket'); 
    }
  }

  private getButtonLabel(data: Product): string {
    return data.price ? "Купить" : "Не продается";
  }

  render(data: Product): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.renderTitle(data.title);
    this.cardImage.src = data.image;
    this.cardImage.alt = data.title;
    this.renderPrice(data.price);
    this.text.textContent = data.description;
    
    this.button.textContent = this.getButtonLabel(data);
    this.button.disabled = data.price === null; 
    return this.cardElement;

  }
}
