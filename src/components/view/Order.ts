import { IEvents } from "../base/events";
import { ensureElement, ensureAllElements, cloneTemplate } from "../../utils/utils";
import { IOrder } from "../../types";

export class Order implements IOrder {
  formOrder: HTMLFormElement;
  buttonAll: HTMLButtonElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    // Клонируем шаблон формы заказа и находим все необходимые элементы
    this.formOrder = cloneTemplate(template);
    this.buttonAll = ensureAllElements('.button_alt', this.formOrder) as HTMLButtonElement[];
    this.buttonSubmit = ensureElement('.order__button', this.formOrder) as HTMLButtonElement;
    this.formErrors = ensureElement('.form__errors', this.formOrder);

    // Обработчик кликов на кнопки выбора метода оплаты
    this.buttonAll.forEach(item => {
      item.addEventListener('click', () => {
        this.paymentSelection = item.name;  // Устанавливаем выбранный метод оплаты
        this.events.emit('order:paymentSelection', item);  // Генерируем событие выбора метода
      });
    });

    // Обработчик изменений в формах ввода данных
    this.formOrder.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      const field = target.name;
      const value = target.value;
      this.events.emit(`order:changeAddress`, { field, value });  // Генерируем событие изменения данных адреса
    });

    // Обработчик отправки формы
    this.formOrder.addEventListener('submit', (event: Event) => {
      event.preventDefault();  // Останавливаем стандартную отправку формы
      this.events.emit('contacts:open');  // Генерируем событие для открытия контактов
    });
  }

  // Сеттер для метода оплаты, который меняет активное состояние кнопок
  set paymentSelection(paymentMethod: string) {
    this.buttonAll.forEach(item => {
      item.classList.toggle('button_alt-active', item.name === paymentMethod);  // Активируем кнопку, соответствующую выбранному методу
    });
  }

  // Сеттер для кнопки отправки формы, управляет её состоянием
  set valid(value: boolean) {
    this.buttonSubmit.disabled = !value;  // Отключаем или включаем кнопку отправки в зависимости от значения
  }

  // Метод для отображения формы
  render(): HTMLElement {
    return this.formOrder  // Возвращаем саму форму заказа
  }
}
