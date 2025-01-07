import { IActions, ICard, Product } from "../../types";
import { IEvents } from "../base/events";
import { cloneTemplate, bem, ensureElement, isEmpty } from "../../utils/utils";

export class Card implements ICard {
   cardElement: HTMLElement;
   cardCategory: HTMLElement;
   cardTitle: HTMLElement;
   cardImage: HTMLImageElement;
   cardPrice: HTMLElement;
  
   colors = <Record<string, string>>{
    "дополнительное": "additional",
    "софт-скил": "soft",
    "кнопка": "button",
    "хард-скил": "hard",
    "другое": "other",
  }
  // cardCategory: string;


  constructor(template: HTMLTemplateElement, protected events: IEvents, private actions?: IActions) {
    // Клонируем шаблон и извлекаем элементы
    // this.cardElement = cloneTemplate<HTMLElement>(template);
    this.cardElement = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
    this.cardCategory = ensureElement<HTMLElement>(".card__category", this.cardElement);
    this.cardTitle = ensureElement<HTMLElement>(".card__title", this.cardElement);
    this.cardImage = ensureElement<HTMLImageElement>(".card__image", this.cardElement);
    this.cardPrice = ensureElement<HTMLElement>(".card__price", this.cardElement);

    // Добавляем обработчик клика
    if (this.actions?.onClick) {
      this.cardElement.addEventListener("click", this.actions.onClick);
    }
  }

  setText(element: HTMLElement, value: unknown): string {
    if (element) {
      return (element.textContent = String(value));
    }
  }

  setCategory(value: string) {
    this.setText(this.cardCategory, value);
    this.cardCategory.className = `card__category card__category_${this.colors[value]}`
    // if (className) {
    //   this.cardCategory.className = className.slice(1); // Удаляем точку из имени класса
    // }
  }

  setPrice(value: number | null): string {
    if (value === null) {
      return "Бесценно";
    }
    return `${value} синапсов`;
  }

  
  render(data: Product): HTMLElement {
    // Устанавливаем данные в элементы карточки
    this.cardCategory.textContent = data.category;
    // this.cardCategory = data.category;
    this.cardTitle.textContent = data.title;
    this.cardImage.src = data.image;
    this.cardImage.alt = this.cardTitle.textContent;
    this.cardPrice.textContent = this.setPrice(data.price);

    // Возвращаем корневой элемент карточки
    return this.cardElement;
  }
}
