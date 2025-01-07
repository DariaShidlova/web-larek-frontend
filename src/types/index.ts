// Интерфейс для описания товара
export interface Product {
    id: string; //id товара
    title: string; //Название товара
    description: string; //Описание товара
    price: number | null; // Цена товара
    category: string; //Категория товара
    image: string; // изображение товара
}
//Интерфейс описывает форму заказа
export interface OrderData {
    payment?: string;
    address?: string;
    phone?: string;
    email?: string;
    total?: number;
    items: string[]
}
//Интерфейс описывает объект, который будет отправлен на сервер как данные заказа
export interface OrderDataServer {
    payment: string;
    address: string;
    phone: string;
    email: string;
    total: number;
    items: string[]
}

//Интерфейс описывает ответ сервера, который возвращается после обработки заказа
export interface OrderDataResult {
    id: string;
    total: number
}
//ошибка заполнения формы
export type FormErrors = Partial<Record<keyof OrderDataServer, string>>;


//Интерфейс для слоя Model
export interface IApiClient {
    cdn: string;
    items: Product[];
    fetchProducts(): Promise<Product[]>; // Загружает список товаров
    sendOrder(orderData: OrderData): Promise<OrderDataResult>; // Отправляет заказ
}

export interface IAppData {
    productCards: Product[];
    selectedСard: Product;
    setPreview(item: Product): void;
}

export interface IBasketManager {
    basket: Product[];
    getCounter: () => number;
    getSumAllProducts: () => number;
    addToBasket(data: Product): void;
    removeFromBasket(item: Product): void;
    clearBasket(): void
}

export interface IOrderFormManager {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
    setOrderAddress(field: string, value: string): void
    validateOrder(): boolean;
    setOrderData(field: string, value: string): void
    validateContacts(): boolean;
    returnOrderLot(): object;
}

//Интерфейс для слоя view
export interface IBasket {
    basket: HTMLElement;
    title: HTMLElement;
    basketList: HTMLElement;
    button: HTMLButtonElement;
    basketPrice: HTMLElement;
    headerBasketButton: HTMLButtonElement;
    headerBasketCounter: HTMLElement;
    renderHeaderBasketCounter(value: number): void;
    renderSumAllProducts(sumAll: number): void;
    render(): HTMLElement;
}

export interface IBasketItem {
    basketItem: HTMLElement;    
    index: HTMLElement;         
    title: HTMLElement;         
    price: HTMLElement;         
    buttonDelete: HTMLButtonElement; 
    render(data: Product, item: number): HTMLElement; 
}

export interface ICard {
    render(data: Product): HTMLElement;
}

export interface ICardPreview {
    text: HTMLElement;
    button: HTMLElement;
    render(data: Product): HTMLElement;
  }

export interface IActions {
    onClick: (event: MouseEvent) => void;
}

export interface IModal {
    open(): void;
    close(): void;
    render(): HTMLElement
}

export interface IContacts {
    contactElement: HTMLElement;
    inputAll: HTMLInputElement[];
    buttonSubmit: HTMLButtonElement;
    formErrors: HTMLElement;
    // email: string;  
    // phone: string;  
    // valid: boolean;
    render(): HTMLElement;
}

export interface IOrder {
    formOrder: HTMLFormElement;
    buttonAll: HTMLButtonElement[];
    paymentSelection: string;
    formErrors: HTMLElement;
    render(): HTMLElement;
}

export interface ISuccess {
    successElement: HTMLElement;
    messageElement: HTMLElement;
    button: HTMLButtonElement;
    render(total: number): HTMLElement;
}
