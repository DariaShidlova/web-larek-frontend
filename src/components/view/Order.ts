import { IEvents } from "../base/events";
import { BaseForm } from "./BaseForm";

export class Order extends BaseForm {
  protected getEventNamespace(): string {
    return "order";
  }

  constructor(template: HTMLTemplateElement, events: IEvents) {
    super(template, events);

    // Устанавливаем слушатели событий для кнопок
    this.buttonAll.forEach(button => {
      button.addEventListener('click', () => {
        const paymentMethod = button.getAttribute('name') || '';
        this.events.emit('order:setPaymentMethod', { paymentMethod });
        this.buttonAll.forEach(btn => btn.classList.toggle('button_alt-active', btn === button));
      });
    });

    // Устанавливаем слушатель события для поля адреса
    const addressInput = this.formElement.querySelector('input[name="address"]') as HTMLInputElement;
    addressInput.addEventListener('input', () => {
      this.events.emit('order:setAddress', { address: addressInput.value });
    });
  }

  protected handleSubmit(): void {
    this.events.emit('contacts:open');
  }

  protected getFormValidationState(): { isValid: boolean } {
    return { isValid: true }; // Минимальная реализация
  }
  
  render(): HTMLElement {
    return super.render();
  }
}

