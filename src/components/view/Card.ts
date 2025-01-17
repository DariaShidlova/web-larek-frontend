import { Product } from "../../types";
import { ProductRender } from "./ProductRender";
import { ensureElement } from "../../utils/utils";

export class Card extends ProductRender {
  cardElement: HTMLElement;
  cardCategory: HTMLElement;
  cardImage: HTMLImageElement;

  constructor(template: HTMLTemplateElement, onOpenModal: () => void) {
    super();

    this.cardElement = template.content.querySelector(".card")!.cloneNode(true) as HTMLElement;

    this.cardCategory = ensureElement<HTMLElement>(".card__category", this.cardElement);
    this.cardImage = ensureElement<HTMLImageElement>(".card__image", this.cardElement);

    this.initProductElements(this.cardElement);

    const button = this.cardElement.querySelector(".card__button");
    if (button) {
      button.addEventListener("click", onOpenModal);
    } else {
      this.cardElement.addEventListener("click", onOpenModal);
    }
  }

  render(data: Product): HTMLElement {
    this.cardCategory.textContent = data.category;
    this.renderTitle(data.title);
    this.cardImage.src = data.image;
    this.cardImage.alt = data.title;
    this.renderPrice(data.price);
    return this.cardElement;
  }

}

