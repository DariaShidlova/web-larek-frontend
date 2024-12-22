import { Component } from "./Component";

export class Page extends Component {
  render(): void {
      throw new Error("Method not implemented.");
  }
  private contentElement: HTMLElement;
  private basketCounterElement: HTMLElement;

  constructor(element: HTMLElement) {
    super(element);
    this.contentElement = this.element.querySelector(".content") as HTMLElement;
    this.basketCounterElement = this.element.querySelector(".basket-counter") as HTMLElement;
  }

  renderPageContent(content: HTMLElement) {
    this.contentElement.innerHTML = "";
    this.contentElement.appendChild(content);
  }

  updateBasketCounter(count: number) {
    this.basketCounterElement.textContent = count.toString();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}