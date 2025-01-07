import { IActions, IBasketItem, Product } from "../../types"; 
import { IEvents } from "../base/events";

export class BasketItem implements IBasketItem {
  basketItem: HTMLElement;    
  index: HTMLElement;         
  title: HTMLElement;         
  price: HTMLElement;         
  buttonDelete: HTMLButtonElement;

  constructor (template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
    // Клонируем шаблон для элемента корзины
    this.basketItem = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
    // Инициализация DOM-элементов внутри элемента корзины
    this.index = this.basketItem.querySelector('.basket__item-index')!;
    this.title = this.basketItem.querySelector('.card__title')!;
    this.price = this.basketItem.querySelector('.card__price')!;
    this.buttonDelete = this.basketItem.querySelector('.basket__item-delete')!;

    // Если передан обработчик для кнопки удаления товара, назначаем его
    if (actions?.onClick) {
      this.buttonDelete.addEventListener('click', actions.onClick);
    }
  }

  // Метод для форматирования цены товара
  protected setPrice(value: number | null) {
    if (value === null) {
      return 'Бесценно'; // Если цена не указана, возвращаем "Бесценно"
    }
    return String(value) + ' синапсов'; // Если цена указана, возвращаем строку с ценой
  }

  // Метод для рендеринга элемента корзины с данными товара
  render(data: Product, item: number) {
    // Присваиваем порядковый номер товара
    this.index.textContent = String(item);
    
    // Присваиваем название товара
    this.title.textContent = data.title;
    
    // Присваиваем цену товара, используя метод setPrice
    this.price.textContent = this.setPrice(data.price);
    
    // Возвращаем готовый элемент, который можно вставить в DOM
    return this.basketItem;
  }
}
