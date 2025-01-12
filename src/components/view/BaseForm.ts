import { IEvents } from "../base/events";
import { ensureElement, ensureAllElements, cloneTemplate } from "../../utils/utils";

export abstract class BaseForm {
  formElement: HTMLElement;
  inputAll: HTMLInputElement[];
  buttonSubmit: HTMLButtonElement;
  buttonAll: HTMLButtonElement[];
  formErrors: HTMLElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.formElement = cloneTemplate(template);
    this.inputAll = ensureAllElements('.form__input', this.formElement) as HTMLInputElement[];
    this.buttonSubmit = ensureElement('.button', this.formElement) as HTMLButtonElement;
    this.buttonAll = ensureAllElements('.button_alt', this.formElement) as HTMLButtonElement[];
    this.formErrors = ensureElement('.form__errors', this.formElement);

    this.addInputListeners();
    this.addSubmitListener();
  }

  protected addInputListeners(): void {
    this.inputAll.forEach(input => {
      input.addEventListener('input', () => {
        this.validateForm();
      });
    });
  }

  // Обработчик отправки формы
  protected addSubmitListener(): void {
    this.formElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  // Проверка валидности формы (переопределяется в дочерних классах)
  protected abstract validateForm(): void;

  // Уникальная обработка отправки формы
  protected abstract handleSubmit(): void;

  // Уникальное пространство имен для событий
  protected abstract getEventNamespace(): string;

  // Сеттер для управления кнопкой отправки
  set isValid(value: boolean) {
    this.buttonSubmit.disabled = !value;
  }

  // Метод для рендера
  render(): HTMLElement {
    return this.formElement;
  }
}
