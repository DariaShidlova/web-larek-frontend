import { OrderData, OrderDataResult, Product, IApiClient } from '../../types';
import { ApiListResponse, Api } from  '../base/api'


export class ApiClient extends Api {
    cdn: string; //URL для формирования ссылок на изображения
    items: Product[]; //массив товаров

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);//инициализирует родительский класс Api, передавая в него базовый URL и настройки.
        this.cdn = cdn; //сохраняет адрес CDN
    }
  // отправляет GET-запрос на /product для получения списка товаров
  fetchProducts(): Promise<Product[]> {
    return this.get('/product').then((data: ApiListResponse<Product>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }

 
  //отправляет POST-запрос на /order для создания заказа
  postOrderLot(order: OrderData): Promise<OrderDataResult> {
    return this.post(`/order`, order).then((data: OrderDataResult) => data);
  }
}

