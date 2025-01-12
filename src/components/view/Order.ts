import { BaseForm } from "./BaseForm";

export class Order extends BaseForm {
  private paymentMethodSelected = false;
  private addressFilled = false;
  

  protected getEventNamespace(): string {
    return "order";
  }

  protected handleSubmit(): void {
    this.events.emit('contacts:open');
  }

  protected validateForm(): void {
    this.isValid = this.paymentMethodSelected && this.addressFilled;
  }

  set paymentSelection(paymentMethod: string) {
    this.paymentMethodSelected = true;
    this.buttonAll.forEach(button => {
      button.classList.toggle('button_alt-active', button.name === paymentMethod);
    });
    this.validateForm();
  }

  set addressInput(address: string) {
    this.addressFilled = address.trim().length > 0;
    this.validateForm();
  }
}

