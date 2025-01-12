import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { ApiClient } from './components/model/ApiClient';
import { AppData } from './components/model/AppData';
import { BasketManager } from './components/model/BasketManager';
import { OrderFormManager } from './components/model/OrderFormManager';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { Card } from './components/view/Card';
import { Contacts } from './components/view/Contacts';
import { Modal } from './components/view/Modal';
import { Order } from './components/view/Order';
import { ProductCardPreview } from './components/view/ProductCardPreview';
import { Success } from './components/view/Success';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { Product } from './types';

const events = new EventEmitter();

// Инициализация менеджеров
const apiClient = new ApiClient(CDN_URL, API_URL);
const appData = new AppData(events);
const basketManager = new BasketManager();
const orderFormManager = new OrderFormManager(events, basketManager);

// Инициализация шаблонов
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

// Инициализация представлений
const productCardPreview = new ProductCardPreview(cardPreviewTemplate, events);
const basketView = new Basket(basketTemplate, document.querySelector(".page__wrapper")!, events);
const pageWrapper = ensureElement<HTMLElement>(".page__wrapper");
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), pageWrapper, events);
const orderView = new Order(orderTemplate, events);
const contactsView = new Contacts(contactsTemplate, events);
const successView = new Success(successTemplate, events);


// Отображение карточек товаров
apiClient.fetchProducts().then((products) => {
  // Сохранение загруженных данных в `appData`
  appData.productCards = products;

  // Отображение карточек товаров в галерее
  const gallery = ensureElement<HTMLElement>('.gallery');

  products.forEach((item) => {
    const card = new Card(cardCatalogTemplate, () => {
      // Событие выбора карточки
      events.emit('card:select', item);
    });

    gallery.append(card.render(item)); // Добавление карточки в DOM
  });
});

// Открытие превью карточки
events.on('card:select', (item: Product) => {
  // Установка данных для предпросмотра
  appData.setPreview(item);

  // Рендеринг содержимого карточки в модальном окне
  const previewContent = productCardPreview.render(item);

  // Установка содержимого модального окна
  modal.setContent(previewContent);

  // Открытие модального окна
  modal.open();
});

// Добавление товара в корзину
events.on('card:addBasket', () => {
  basketManager.addToBasket(appData.selectedСard);
  basketView.renderHeaderBasketCounter(basketManager.getCounter());
  modal.close();
});

// Открытие корзины при клике на значок корзины
events.on('basket:open', () => {
  // Проверяем, есть ли товары в корзине
  const basketItems = basketManager.basketProducts;
  
  // Если товары есть, отображаем их
  if (basketItems.length > 0) {
    const basketItemsHtml = basketItems.map((item, index) => {
      const basketItemView = new BasketItem(cardBasketTemplate, () => {
        basketManager.removeFromBasket(item);
        basketView.renderHeaderBasketCounter(basketManager.getCounter());
        events.emit('basket:open'); // Перерисовываем корзину после удаления товара
      });
      return basketItemView.render(item, index + 1);
    });

    basketView.items = basketItemsHtml; // Отображаем товары в корзине
    basketView.renderSumAllProducts(basketManager.getSumAllProducts());
  } else {
    // Если корзина пуста
    basketView.items = [];
    basketView.renderSumAllProducts(0);
  }
  
  // Открытие модального окна корзины
  modal.setContent(basketView.render());
  modal.open();
});

// Закрытие модального окна при клике на кнопку закрытия
const closeButton = ensureElement<HTMLElement>(".modal__close", modal.modalElement);
closeButton.addEventListener("click", () => {
  modal.close();
});

// Удаление товара из корзины
events.on('basket:remove', (item: Product) => {
  basketManager.removeFromBasket(item); // Удаляем товар из корзины
  basketView.renderHeaderBasketCounter(basketManager.getCounter()); // Обновляем счетчик товаров
  basketView.renderSumAllProducts(basketManager.getSumAllProducts()); // Обновляем общую сумму
});

// Открытие формы оформления заказа
events.on('order:open', () => {
  // Рендеринг формы заказа
  const orderContent = orderView.formElement;

  // Слушатель для кнопок выбора способа оплаты
  orderView.formElement.querySelectorAll<HTMLButtonElement>('.order__buttons .button_alt').forEach(button => {
    button.addEventListener('click', () => {
      orderView.paymentSelection = button.name;// Устанавливаем выбранный способ оплаты
    });
  });


  // Слушатель для поля ввода адреса
  const addressInput = orderView.formElement.querySelector<HTMLInputElement>('input[name="address"]')!;
  addressInput.addEventListener('input', () => {
    orderView.addressInput = addressInput.value; // Обновляем значение адреса
  });

  // Установка содержимого и открытие модального окна
  modal.setContent(orderContent);
  modal.open();
});


// Открытие окна контактов
events.on('contacts:open', () => {
  // Рендеринг формы контактов
  const contactsContent = contactsView.formElement;

  // Получение полей ввода
  const emailInput = contactsView.formElement.querySelector<HTMLInputElement>('input[name="email"]')!;
  const phoneInput = contactsView.formElement.querySelector<HTMLInputElement>('input[name="phone"]')!;

  // Обновление состояния формы при вводе email
  emailInput.addEventListener('input', () => {
    contactsView.emailInput = emailInput.value; // Обновляем значение email
  });
// Обновление состояния формы при вводе телефона
phoneInput.addEventListener('input', () => {
  contactsView.phoneInput = phoneInput.value; // Обновляем значение телефона
});

// Установка содержимого и открытие модального окна
modal.setContent(contactsContent);
modal.open();
});

// Обработка события успешной оплаты
events.on('success:open', () => {
  // Получаем общую сумму товаров в корзине
  const totalAmount = basketManager.getSumAllProducts();

  // Рендерим и открываем окно успешной оплаты
  modal.setContent(successView.render(totalAmount));
  modal.open();
});

// Обработка события закрытия успешной оплаты (очистка корзины и закрытие окна)
events.on('success:close', () => {
  // Очищаем корзину
  basketManager.clearBasket(); // Метод для очистки корзины

  // Обновляем счетчик товаров в корзине
  basketView.renderHeaderBasketCounter(basketManager.getCounter());
  
  // Обновляем общую сумму товаров в корзине
  basketView.renderSumAllProducts(basketManager.getSumAllProducts());
  
  // Закрываем модальное окно
  modal.close();
});

