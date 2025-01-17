import { BaseForm } from "./BaseForm";

export class Contacts extends BaseForm {
  protected getEventNamespace(): string {
    return "contacts";
  }

  protected handleSubmit(): void {
    if (this.getFormValidationState().isValid) {
      this.events.emit('contacts:submit'); 
    }
  }
  
  protected getFormValidationState(): { isValid: boolean } {
    const isValid = this.inputAll.every(input => input.value.length > 0); 
    return { isValid };
  }

  render(): HTMLElement {
    const emailInput = this.formElement.querySelector('input[name="email"]') as HTMLInputElement;
    const phoneInput = this.formElement.querySelector('input[name="phone"]') as HTMLInputElement;

    emailInput.addEventListener('input', () => {
      this.events.emit('contacts:setEmail', { email: emailInput.value });
    });

    phoneInput.addEventListener('input', () => {
      this.events.emit('contacts:setPhone', { phone: phoneInput.value });
    });

    return super.render();
  }
}
