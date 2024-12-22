import { Component } from "./Component";

export class Form extends Component {
  render(): void {
      throw new Error("Method not implemented.");
  }
  private formElement: HTMLFormElement;
  private submitButton: HTMLButtonElement;

  constructor(element: HTMLElement) {
    super(element);
    this.formElement = this.element as HTMLFormElement;
    this.submitButton = this.element.querySelector("button[type='submit']") as HTMLButtonElement;
  }

  getFormData(): FormData {
    return new FormData(this.formElement);
  }

  submitForm() {
    this.formElement.submit();
  }

  onSubmit(callback: (formData: FormData) => void) {
    this.formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      callback(this.getFormData());
    });
  }

  resetForm() {
    this.formElement.reset();
  }
}
