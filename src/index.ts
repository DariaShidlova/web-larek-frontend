import './scss/styles.scss';
import { ApiClient } from './components/model/ApiClient';
import { AppData } from './components/model/AppData';
import { Basket } from './components/view/Basket';
import { Card } from './components/view/Card';
import { Contacts } from './components/view/Contacts';
import { Page } from './components/view/Page';
import { Success } from './components/view/Success';
import { Presenter } from './components/Presenter';

// URL API сервера
const API_URL = 'https://api.example.com';

// Инициализация DOM элементов для компонентов
const basketElement = document.querySelector('.basket') as HTMLElement;
const cardElement = document.querySelector('.card') as HTMLElement;
const contactsElement = document.querySelector('.contacts') as HTMLElement;
const pageElement = document.querySelector('.page') as HTMLElement;
const successElement = document.querySelector('.success') as HTMLElement;

// Проверка наличия необходимых элементов в DOM
if (!basketElement || !cardElement || !contactsElement || !pageElement || !successElement) {
    throw new Error('One or more required DOM elements are missing.');
}

// Инициализация View компонентов
const basketView = new Basket(basketElement);
const cardView = new Card(cardElement);
const contactsView = new Contacts(contactsElement);
const pageView = new Page(pageElement);
const successView = new Success(successElement);

// Создание экземпляра Presenter
const presenter = new Presenter(
    API_URL,
    basketView,
    cardView,
    contactsView,
    pageView,
    successView
);

// Загрузка данных продуктов при старте
presenter.loadProducts();

// Пример настройки обработчиков событий
document.addEventListener('addToBasket', (event: Event) => {
    const customEvent = event as CustomEvent<number>;
    presenter.addToBasket(customEvent.detail);
});

// Настройка поведения для подтверждения заказа
const orderButton = document.querySelector('.order-button') as HTMLButtonElement;
if (orderButton) {
    orderButton.addEventListener('click', () => presenter.placeOrder());
}

console.log('App initialized successfully.');
