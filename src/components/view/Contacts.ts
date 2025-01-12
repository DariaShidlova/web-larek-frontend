import { BaseForm } from "./BaseForm";

export class Contacts extends BaseForm {
  private emailFilled = false;
  private phoneFilled = false;

  protected getEventNamespace(): string {
    return "contacts";
  }

  protected handleSubmit(): void {
    this.events.emit('success:open');
  }

  protected validateForm(): void {
    this.isValid = this.emailFilled && this.phoneFilled;
  }

  set emailInput(email: string) {
    this.emailFilled = email.trim().length > 0;
    this.validateForm();
  }

  set phoneInput(phone: string) {
    this.phoneFilled = phone.trim().length > 0;
    this.validateForm();
  }
}

