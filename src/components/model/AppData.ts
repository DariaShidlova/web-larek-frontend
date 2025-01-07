import { Product, IAppData } from "../../types";
import { IEvents } from "../base/events";


export class AppData implements IAppData {
  protected _productCards: Product[];
  selectedСard: Product;

  constructor(protected events: IEvents) {
    this._productCards = []
  }

  set productCards(data: Product[]) {
    this._productCards = data;
    this.events.emit('productCards:receive');
  }

  get productCards() {
    return this._productCards;
  }

  setPreview(item: Product) {
    this.selectedСard = item;
    this.events.emit('modalCard:open', item)
  }
}