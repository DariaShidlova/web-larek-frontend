import { Component } from "./Component";

export class Success extends Component {
  render(): void {
      throw new Error("Method not implemented.");
  }
  private messageElement: HTMLElement;

  constructor(element: HTMLElement) {
    super(element);
    this.messageElement = this.element.querySelector(".success-message") as HTMLElement;
  }

  showSuccessMessage(message: string) {
    this.messageElement.textContent = message;
    this.element.classList.add("visible");
  }

  hideMessage() {
    this.element.classList.remove("visible");
  }
}
