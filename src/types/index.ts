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

// Интерфейс для событий EventEmitter
export interface EventEmitter {
    on(event: string, listener: Function): void; // Подписка на событие
    off(event: string, listener: Function): void; // Отписка от события
    emit(event: string, data?: any): void; // Генерация события
}

// Интерфейс для отображения формы контактов
export interface ContactForm {
    validateContacts(data: ContactData): boolean; // Проверяет корректность контактной информации
    getContactData(): ContactData; // Возвращает введенные контактные данные
}

// Интерфейс для корзины
export interface BasketView {
    renderBasketItems(items: Product[]): void; // Отображает список товаров в корзине
    updateTotalPrice(price: number): void; // Обновляет общую стоимость товаров
    clearBasket(): void; // Очищает корзину
}

// Интерфейс для формы оплаты
export interface PaymentForm {
    getFormData(): FormData; // Получает данные формы
    submitForm(): void; // Отправляет данные формы
    resetForm(): void;  // Очищает поля формы
}

// Интерфейс для отображения успешного завершения заказа
export interface SuccessMessage {
    showSuccessMessage(message: string): void; // Отображает сообщение об успехе
    hideMessage(): void; // Скрывает сообщение
}

// Интерфейс для карточки товара
export interface ProductCard {
    setProductDetails(details: Product): void; // Устанавливает данные товара
    onAddToBasket(callback: (productId: number) => void): void; // Обработчик нажатия кнопки "Купить"
}

// Интерфейс для данных страницы
export interface PageView {
    renderPageContent(content: HTMLElement): void; // Отображает основной контент страницы
    updateBasketCounter(count: number): void; // Обновляет счетчик товаров в корзине
    scrollToTop(): void; // Прокручивает страницу наверх
}
