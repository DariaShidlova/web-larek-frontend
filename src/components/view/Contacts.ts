import { IEvents } from "../base/events";
import { BaseForm } from "./BaseForm";

export class Contacts extends BaseForm {
  private emailInput: HTMLInputElement;
  private phoneInput: HTMLInputElement;

  protected getEventNamespace(): string {
    return "contacts";
  }

  constructor(template: HTMLTemplateElement, events: IEvents) {
    super(template, events);

    this.emailInput = this.formElement.querySelector('input[name="email"]') as HTMLInputElement;
    this.phoneInput = this.formElement.querySelector('input[name="phone"]') as HTMLInputElement;

    this.emailInput.addEventListener('input', () => {
      this.events.emit('contacts:setEmail', { email: this.emailInput.value });
    });

    this.phoneInput.addEventListener('input', () => {
      this.events.emit('contacts:setPhone', { phone: this.phoneInput.value });
    });
  }

  protected handleSubmit(): void {
    this.events.emit('contacts:submit');
  }

  render(): HTMLElement {
    return super.render();
  }
}

