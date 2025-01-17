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

  protected addSubmitListener(): void {
    this.formElement.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      this.handleSubmit();
    });
  }

  protected abstract getFormValidationState(): { isValid: boolean };

  protected abstract handleSubmit(): void;

  protected abstract getEventNamespace(): string;

  set isValid(value: boolean) {
    this.buttonSubmit.disabled = !value;
  }

  render(): HTMLElement {
    return this.formElement;
  }

  protected validateForm(): void {
    const { isValid } = this.getFormValidationState();
    this.isValid = isValid;
  }
}
