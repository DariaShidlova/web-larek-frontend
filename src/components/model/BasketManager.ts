import { Product } from "../../types";
import { IBasketManager } from '../../types/index'

export class BasketManager implements IBasketManager {
  basket: Product[]; 

  constructor() {
    this.basket = [];
  }

  // set basketProducts(data: Product[]) {
  //   this.basket = data;
  // }

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