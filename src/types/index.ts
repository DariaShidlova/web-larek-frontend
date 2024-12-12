//структура данных продукта
export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
};
//число продуктов в корзине
export type BasketItem = Product & {
    quantity: number;
};
//корзина покупок с массивом
export type Basket = BasketItem[];
