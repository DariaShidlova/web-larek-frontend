
export class ProductRender {
  protected setPrice(value: number | null): string {
    return value === null ? "Бесценно" : `${value} синапсов`;
  }

  renderTitle(element: HTMLElement, title: string): void {
    element.textContent = title;
  }

  renderPrice(element: HTMLElement, price: number | null): void {
    element.textContent = this.setPrice(price);
  }
}
