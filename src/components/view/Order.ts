import { Component } from "./Component";

export class Order extends Component {
  render(): void {
      throw new Error("Method not implemented.");
  }
  private orderElement: HTMLElement;

  constructor(element: HTMLElement) {
    super(element);
    this.orderElement = this.element;
  }

  setOrderDetails(order: { items: string[]; total: number }) {
    const itemsList = this.orderElement.querySelector(".order-items") as HTMLElement;
    const totalElement = this.orderElement.querySelector(".order-total") as HTMLElement;

    itemsList.innerHTML = order.items.map((item) => `<li>${item}</li>`).join("");
    totalElement.textContent = `${order.total} синапсов`;
  }

  onSubmit(callback: (orderData: { items: string[]; total: number }) => void) {
    const submitButton = this.orderElement.querySelector("button[type='submit']") as HTMLButtonElement;
    submitButton.addEventListener("click", () => {
      const items = Array.from(this.orderElement.querySelectorAll(".order-items li"), (item) => item.textContent || "");
      const total = parseInt(this.orderElement.querySelector(".order-total")?.textContent || "0", 10);
      callback({ items, total });
    });
  }
}