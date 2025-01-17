import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";
import { Product } from "../../types";
import { Card } from "./Card";

export class Page {
  private headerBasketButton: HTMLButtonElement;
  private headerBasketCounter: HTMLElement;
  private pageWrapper: HTMLElement;
  private gallery: HTMLElement;

  constructor(private events: IEvents, container: HTMLElement) {

    this.headerBasketButton = ensureElement<HTMLButtonElement>(".header__basket", container);
    this.headerBasketCounter = ensureElement<HTMLElement>(".header__basket-counter", container);
    this.pageWrapper = ensureElement<HTMLElement>(".page__wrapper", container);
    this.gallery = ensureElement<HTMLElement>(".gallery", container);

    this.headerBasketButton.addEventListener("click", () => this.events.emit("basket:open"));
 
    this.events.on('basket:updated', (basket: Product[]) => {
      this.renderHeaderBasketCounter(basket.length);
    });
  }

  renderHeaderBasketCounter(value: number): void {
    this.headerBasketCounter.textContent = String(value);
  }

  public set locked(value: boolean) {
    if (value) {
      this.pageWrapper.classList.add("page__wrapper_locked");
    } else {
      this.pageWrapper.classList.remove("page__wrapper_locked");
    }
  }

  appendCard(cardElement: HTMLElement): void {
    this.gallery.appendChild(cardElement);
  }
}
