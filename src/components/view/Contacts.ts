import { Component } from "./Component";

export class Contacts extends Component {
  render(): void {
      throw new Error("Method not implemented.");
  }
  private fields: { email: HTMLInputElement; phone: HTMLInputElement };

  constructor(element: HTMLElement) {
    super(element);
    this.fields = {
      email: this.element.querySelector("[name='email']") as HTMLInputElement,
      phone: this.element.querySelector("[name='phone']") as HTMLInputElement,
    };
  }

  validateContacts(): boolean {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.fields.email.value);
    const phoneValid = /^\+?\d{10,15}$/.test(this.fields.phone.value);
    return emailValid && phoneValid;
  }

  getContactData() {
    return {
      email: this.fields.email.value,
      phone: this.fields.phone.value,
    };
  }

  onChange(callback: (data: { email: string; phone: string }) => void) {
    this.fields.email.addEventListener("input", () => callback(this.getContactData()));
    this.fields.phone.addEventListener("input", () => callback(this.getContactData()));
  }
}
