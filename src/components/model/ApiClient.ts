import { OrderData, OrderDataResult, Product, IApiClient } from '../../types';
import { ApiListResponse, Api } from  '../base/api'


export class ApiClient extends Api {
    cdn: string;
    items: Product[];

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }
    
  fetchProducts(): Promise<Product[]> {
    return this.get('/product').then((data: ApiListResponse<Product>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }

  postOrderLot(order: OrderData): Promise<OrderDataResult> {
    return this.post(`/order`, order).then((data: OrderDataResult) => data);
  }
}

