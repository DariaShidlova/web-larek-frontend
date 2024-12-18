// Интерфейс для описания товара
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
}

// Интерфейс для описания контактных данных пользователя
export interface ContactData {
    email: string;
    phone: string;
}

// Интерфейс для описания данных заказа
export interface OrderData {
    products: Product[]; // Список товаров в заказе
    address: string;     // Адрес доставки
    paymentMethod: string; // Метод оплаты
}

// Интерфейс для элемента корзины
export interface BasketItem {
    product: Product; // Товар в корзине
    quantity: number; // Количество товара
}

// Интерфейс для ответа от API, возвращающего список объектов
export interface ApiListResponse<Type> {
    total: number; // Общее количество объектов
    items: Type[]; // Список объектов
}

// Интерфейс для методов API, которые изменяют данные
export interface ApiPostMethods {
    method: 'POST' | 'PUT' | 'DELETE';
}
