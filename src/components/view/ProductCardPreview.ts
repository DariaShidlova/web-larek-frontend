import { Card } from "./Card"; 
import { IActions, ICardPreview, Product } from "../../types";
import { IEvents } from "../base/events";


export class ProductCardPreview extends Card implements ICardPreview {
  text: HTMLElement;          
  button: HTMLElement;      

  constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    super(template, events, actions);
    this.text = this.cardElement.querySelector('.card__text');
    this.button = this.cardElement.querySelector('.card__button');
    
    // Назначение обработчика нажатия на кнопку
    this.button.addEventListener('click', () => { 
      this.events.emit('card:addBasket');  // Событие добавления в корзину
    });
  }

  // Метод для проверки наличия цены и установки состояния кнопки
  notSale(data: Product) {
    if (data.price) {
      // this.button.removeAttribute('disabled');  // Если цена есть, кнопка доступна
      return 'Купить';                          // Кнопка "Купить"
    } else {
      // this.button.setAttribute('disabled', 'true');  // Если нет цены, кнопка заблокирована
      return 'Не продается';                        // Кнопка "Не продается"
    }
  }

  // Метод для рендеринга карточки товара с переданными данными
  render(data: Product): HTMLElement {
    this.cardCategory.textContent = data.category;  // Заполнение категории товара
    // this.cardCategory = data.category;               // Установка категории
    this.cardTitle.textContent = data.title;        // Заполнение названия товара
    this.cardImage.src = data.image;                // Заполнение изображения товара
    this.cardImage.alt = this.cardTitle.textContent; // Установка alt для изображения
    this.cardPrice.textContent = this.setPrice(data.price);  // Заполнение цены товара
    this.text.textContent = data.description;        // Заполнение описания товара
    this.button.textContent = this.notSale(data);    // Заполнение текста на кнопке (или блокировка)
    
    return this.cardElement;  // Возвращаем готовый элемент карточки
  }
}
