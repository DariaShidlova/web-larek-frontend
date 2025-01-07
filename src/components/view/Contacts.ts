import { IEvents } from "../base/events";
import { ensureElement, ensureAllElements, cloneTemplate } from "../../utils/utils";
import { IContacts } from "../../types";

export class Contacts implements IContacts {
  contactElement: HTMLElement;
  inputAll: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;
  formErrors: HTMLElement;  

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    // Клонируем шаблон формы и ищем все необходимые элементы
    this.contactElement = cloneTemplate(template);
    this.inputAll = ensureAllElements('.form__input', this.contactElement) as HTMLInputElement[];
    this.buttonSubmit = ensureElement('.button', this.contactElement) as HTMLButtonElement;
    this.formErrors = ensureElement('.form__errors', this.contactElement);

    // Добавляем обработчик на изменения ввода
    this.inputAll.forEach(input => {
      input.addEventListener('input', (event) => {
        const target = event.target as HTMLInputElement;
        const field = target.name;
        const value = target.value;

        this.events.emit(`contacts:changeInput`, { field: target.name, value: target.value });
      });
    });

    // Обработчик отправки формы
    this.contactElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();  // Останавливаем стандартную отправку формы
      this.events.emit('success:open');
    });
  }

  // Сеттер для кнопки отправки формы, управляет её состоянием
  set validateContacts(value: boolean) {
    this.buttonSubmit.disabled = !value;
  }

  // Метод для отображения формы
  render(): HTMLElement {
    return this.contactElement;
  }
}
