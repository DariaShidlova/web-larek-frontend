import { Product } from "../../types";
import { IBasketManager } from '../../types/index'

export class BasketManager implements IBasketManager {
  basket: Product[]; 

  constructor() {
    this.basket = [];
  }

  set basketProducts(data: Product[]) {
    this.basket = data;
  }

  get basketProducts() {
    return this.basket;
  }

  getCounter() {
    return this.basket.length;
  }

  getSumAllProducts() {
    let sumAll = 0;
    this.basket.forEach(item => {
      sumAll = sumAll + item.price;
    });
    return sumAll;
  }

  addToBasket(data: Product) {
    this.basket.push(data);
  }

  removeFromBasket(item: Product) {
    const index = this.basket.indexOf(item);
    if (index >= 0) {
      this.basket.splice(index, 1);
    }
  }

  clearBasket() {
    this.basket = []
  }
}