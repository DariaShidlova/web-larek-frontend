import './scss/styles.scss';
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { ApiClient } from './components/model/ApiClient';
import { AppData } from './components/model/AppData';
import { BasketManager } from './components/model/BasketManager';
import { OrderFormManager } from './components/model/OrderFormManager';
import { Modal } from './components/view/Modal';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { Card } from './components/view/Card';
import { ProductCardPreview } from './components/view/ProductCardPreview';
import { Order } from './components/view/Order';
import { Contacts } from './components/view/Contacts';
import { Success } from './components/view/Success';
import { ensureElement } from './utils/utils';
import { FormErrors, OrderData, Product } from './types';

const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

const events = new EventEmitter();
const apiClient = new ApiClient(CDN_URL, API_URL);
const appData = new AppData(events);
const basketManager = new BasketManager();
const orderFormManager = new OrderFormManager(events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basketView = new Basket(basketTemplate, events);
const contactsView = new Contacts(contactsTemplate, events);
const orderView = new Order(orderTemplate, events);
const productCardPreview = new ProductCardPreview(cardPreviewTemplate, events)

// /** Отображение карточек товаров */
apiClient.fetchProducts().then((products) => {
  appData.productCards = products;
  products.forEach((item) => {
    const card = new Card(cardCatalogTemplate, events, {
      onClick: () => events.emit('card:select', item),
    });
    ensureElement<HTMLElement>('.gallery').append(card.render(item));
  });
});

/** Открытие превью карточки товара */
events.on('card:select', (item: Product) => {
  appData.setPreview(item); // Передаем объект типа Product
  const preview = new ProductCardPreview(cardPreviewTemplate, events); // Убедитесь, что ProductCardPreview корректно типизирован
  modal.setContent(preview.render(item)); // Метод render принимает объект типа Product
  modal.render();
});

/** Добавление товара в корзину */
events.on('card:addBasket', () => {
  basketManager.addToBasket(appData.selectedСard);
  basketView.renderHeaderBasketCounter(basketManager.getCounter());
  modal.close();
});

/** Открытие корзины */
events.on('basket:open', () => {
  basketView.renderSumAllProducts(basketManager.getSumAllProducts());
  let index = 0;
  basketView.items = basketManager.basket.map((item) => {
    const basketItem = new BasketItem(cardBasketTemplate, events, {
      onClick: () => events.emit('basket:remove', item),
    });
    index += 1;
    return basketItem.render(item, index);
  });
  modal.setContent(basketView.render());
  modal.render();
});

/** Удаление товара из корзины */
events.on('basket:remove', (item: Product) => {
  basketManager.removeFromBasket(item); // Удаляем товар из корзины
  basketView.renderHeaderBasketCounter(basketManager.getCounter()); // Обновляем счетчик товаров
  basketView.renderSumAllProducts(basketManager.getSumAllProducts()); // Обновляем общую сумму
});

/** Открытие формы заказа */
events.on('order:open', () => {
  orderFormManager.items = basketManager.basket.map(item => String(item.id)); // Преобразуем в строку
  modal.setContent(orderView.render());
  modal.render();
});

/** Установка способа оплаты */
events.on('order:paymentSelection', (button: HTMLButtonElement) => {
  orderFormManager.payment = button.name;
});

//** Валидация адреса и оплаты */
events.on('order:changeAddress', (data: object) => {
  if ('field' in data && 'value' in data) {
    const { field, value } = data as { field: string, value: string };
    orderFormManager.setOrderAddress(field, value);
  }
});

events.on('formErrors:address', (errors: FormErrors) => {
  const { address, payment } = errors; // Теперь TypeScript знает, что у errors есть address и payment
  orderView.valid = !address && !payment; // Устанавливаем валидность формы
  orderView.formErrors.textContent = Object.values(errors)
    .filter(Boolean)
    .join('; '); // Сообщения об ошибках, разделенные точкой с запятой
});

/** Открытие формы контактов */
events.on('contacts:open', () => {
  orderFormManager.total = basketManager.getSumAllProducts();
  modal.setContent(contactsView.render());
  modal.render();
});

/** Валидация контактов */
events.on('contacts:changeInput', ({ field, value }: {field: string, value: string}) => {
  orderFormManager.setOrderData(field, value);
});

/********** Валидация данных строки "Email" и "Телефон" **********/
events.on('formErrors:change', (errors: Partial<OrderData>) => {
  const { email, phone } = errors;
  contactsView.validateContacts = !email && !phone;
  contactsView.formErrors.textContent = Object.values({phone, email}).filter(i => !!i).join('; ');
})

events.on('success:open', () => {
  apiClient.postOrderLot(orderFormManager.returnOrderLot())
    .then((data) => {
      console.log(data); // ответ сервера
      const success = new Success(successTemplate, events);
      modal.setContent(success.render(basketManager.getSumAllProducts()));  // устанавливаем содержимое
      basketManager.clearBasket(); // очищаем корзину
      basketView.renderHeaderBasketCounter(basketManager.getCounter()); // отобразить количество товара на иконке корзины
      modal.render();  // открываем модальное окно
    })
    .catch(error => console.log(error));
});


events.on('success:close', () => modal.close());

