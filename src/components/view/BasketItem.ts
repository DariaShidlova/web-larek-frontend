import { Product } from "../../types";
import { ProductRender } from "./ProductRender";

export class BasketItem extends ProductRender {
  basketItem: HTMLElement;
  index: HTMLElement;
  title: HTMLElement;
  price: HTMLElement;
  buttonDelete: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, onDelete: () => void) {
    super();
    this.basketItem = template.content.querySelector(".basket__item")!.cloneNode(true) as HTMLElement;
    this.index = this.basketItem.querySelector(".basket__item-index")!;
    this.title = this.basketItem.querySelector(".card__title")!;
    this.price = this.basketItem.querySelector(".card__price")!;
    this.buttonDelete = this.basketItem.querySelector(".basket__item-delete")!;
    this.buttonDelete.addEventListener("click", onDelete);
  }

  render(data: Product, itemIndex: number): HTMLElement {
    this.index.textContent = String(itemIndex);
    this.renderTitle(this.title, data.title);
    this.renderPrice(this.price, data.price);
    return this.basketItem;
  }
}

