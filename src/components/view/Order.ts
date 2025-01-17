import { BaseForm } from "./BaseForm";

export class Order extends BaseForm {
  protected getEventNamespace(): string {
    return "order";
  }

  protected handleSubmit(): void {
    this.events.emit('contacts:open');
  }

  protected getFormValidationState(): { isValid: boolean } {
    const addressInput = this.formElement.querySelector('input[name="address"]') as HTMLInputElement;
    const paymentButtonActive = this.buttonAll.some(button => button.classList.contains('button_alt-active'));
    
    const isValid = addressInput.value.trim().length > 0 && paymentButtonActive;
    return { isValid };
  }

  render(): HTMLElement {
    this.buttonAll.forEach(button => {
      button.addEventListener('click', () => {
        const paymentMethod = button.getAttribute('name') || '';
        this.events.emit('order:setPaymentMethod', { paymentMethod });
        this.buttonAll.forEach(btn => btn.classList.toggle('button_alt-active', btn === button));
        this.validateForm();
      });
    });

    const addressInput = this.formElement.querySelector('input[name="address"]') as HTMLInputElement;
    addressInput.addEventListener('input', () => {
      this.events.emit('order:setAddress', { address: addressInput.value });
      this.validateForm();
    });

    return super.render();
  }
}

