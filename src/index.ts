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
import { Page } from './components/view/Page';
import { Modal } from './components/view/Modal';
import { Order } from './components/view/Order';
import { ProductCardPreview } from './components/view/ProductCardPreview';
import { Success } from './components/view/Success';
import { API_URL, CDN_URL } from './utils/constants';
import { ensureElement } from './utils/utils';
import { OrderData, Product } from './types';

const events = new EventEmitter();

// Инициализация менеджеров
const apiClient = new ApiClient(CDN_URL, API_URL);
const appData = new AppData(events);
const basketManager = new BasketManager(events);
const orderFormManager = new OrderFormManager(events);

// Инициализация шаблонов
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement;
const successTemplate = document.querySelector('#success') as HTMLTemplateElement;

// Основной контейнер страницы
const pageContainer = ensureElement<HTMLElement>('.page');

// Инициализация представлений
const page = new Page(events, pageContainer);
const productCardPreview = new ProductCardPreview(cardPreviewTemplate, events);
const basketView = new Basket(basketTemplate, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const orderView = new Order(orderTemplate, events);
const contactsView = new Contacts(contactsTemplate, events);
const successView = new Success(successTemplate, events);
const cardContainer = ensureElement<HTMLElement>('.gallery');


// Отображение карточек товаров
apiClient.fetchProducts().then((products) => {
  // Сохранение загруженных данных в `appData`
  appData.productCards = products;

  products.forEach((item) => {
    const card = new Card(cardCatalogTemplate, () => {
      // Событие выбора карточки
      events.emit('card:select', item);
    });
    cardContainer.append(card.render(item)); 
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
    const selectedCard = appData.selectedСard;
    if (selectedCard) {
      basketManager.addToBasket(selectedCard);
      modal.close();
    }
});

// events.on('basket:check', ({ id, callback }: { id: string; callback: (result: boolean) => void }) => {
//   const isInBasket = basketManager.isInBasket(id);
//   callback(isInBasket);
// });

// Обработка события basket:check
events.on('basket:check', ({ id, callback }: { id: string; callback: (result: boolean) => void }) => {
  const isInBasket = basketManager.isInBasket(id);
  callback(isInBasket);
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

//очищает корзину
events.on("basket:remove", (product: Product) => {
    basketManager.removeFromBasket(product);
});

// Подписки на события
events.on('order:setPaymentMethod', ({ paymentMethod }: { paymentMethod: string }) => {
    orderFormManager.setPaymentMethod(paymentMethod);
  });
  
  events.on('order:setAddress', ({ address }: { address: string }) => {
    orderFormManager.setOrderAddress(address);
  });
  
  events.on('contacts:setEmail', ({ email }: { email: string }) => {
    orderFormManager.setOrderData('email', email);
  });
  
  events.on('contacts:setPhone', ({ phone }: { phone: string }) => {
    orderFormManager.setOrderData('phone', phone);
  });
  
   // Подписка на изменения состояния валидации
   events.on('order:stateChange', ({ isValid }: { isValid: boolean }) => {
  isValid = isValid;
  });

  // Открытие модальных окон
  events.on('order:open', () => {
    modal.setContent(orderView.render());
    modal.open();
  });
  
  events.on('contacts:open', () => {
    modal.setContent(contactsView.render());
    modal.open();
  });

 // Подписка на событие отправки формы контактов
events.on('contacts:submit', async () => {
  const formState = orderFormManager.getFormState();

  const orderData: OrderData = {
    payment: formState.data.payment,
    address: formState.data.address,
    phone: formState.data.phone,
    email: formState.data.email,
    total: basketManager.getSumAllProducts(),
    items: basketManager.basket.map((item) => item.id),
  };

  try {
    const response = await apiClient.postOrderLot(orderData);

    // Отображение окна успешной оплаты
    modal.setContent(successView.render(response.total));
    modal.open();

    // Очистка корзины после успешного заказа
    basketManager.clearBasket();
  } catch (error) {
  }
});

// Подписка на событие закрытия окна успеха
events.on('success:close', () => {
  modal.close();
});

// Блокирует прокрутку
events.on("modal:open", () => {
  page.locked = true; 
});

// Разблокирует прокрутку
events.on("modal:close", () => {
  page.locked = false;
});