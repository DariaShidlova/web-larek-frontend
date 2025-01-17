import { Product } from "../../types";
import { ProductRender } from "./ProductRender";
import { ensureElement } from "../../utils/utils";

export class BasketItem extends ProductRender {
  basketItem: HTMLElement;
  index: HTMLElement;
  buttonDelete: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, onDelete: () => void) {
    super();

    this.basketItem = document.querySelector(".basket__item")!.cloneNode(true) as HTMLElement;

    this.index = ensureElement<HTMLElement>(".basket__item-index", this.basketItem);
    this.buttonDelete = ensureElement<HTMLButtonElement>(".basket__item-delete", this.basketItem);

    this.initProductElements(this.basketItem);

    this.buttonDelete.addEventListener("click", onDelete);
  }

  render(data: Product, itemIndex: number): HTMLElement {
    this.index.textContent = String(itemIndex);
    this.renderTitle(data.title);
    this.renderPrice(data.price);
    return this.basketItem;
  }
}
