import { Product } from "../../types";
import { IEvents } from "../base/events";
import { IBasketManager } from '../../types/index'

export class BasketManager implements IBasketManager {
  basket: Product[];
  events: IEvents;

  constructor(events: IEvents) {
    this.basket = [];
    this.events = events;
  }

  get basketProducts() {
    return this.basket;
  }

  getCounter() {
    return this.basket.length;
  }

  getSumAllProducts() {
    return this.basket.reduce((sum, item) => sum + item.price, 0);
  }

  addToBasket(data: Product) {
    this.basket.push(data);
    this.events.emit('basket:updated', this.basket);
  }

  removeFromBasket(item: Product) {
    const index = this.basket.indexOf(item);
    if (index >= 0) {
      this.basket.splice(index, 1);
      this.events.emit('basket:updated', this.basket);
    }
  }

  clearBasket() {
    this.basket = [];
    this.events.emit('basket:updated', this.basket);
  }

  isInBasket(id: string): boolean {
    return this.basket.some((product) => product.id === id);
  }
}
