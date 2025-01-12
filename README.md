# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
# Описание

В проекте применен принцип MVP (Model-View-Presenter), который обеспечивает четкое разделение ответственностей между классами Model и View каждый класс выполняет свою определенную роль:

- **Model (Модель)**: работает с данными, выполняет бизнес-логику и управляет состоянием приложения.
- **View (Представление)**: отвечает за отображение данных пользователю и обработку взаимодействий.
- **Presenter (Представитель)**: связывает Model и View, обрабатывает события и координирует взаимодействие между слоями.

## Функции основных частей

- **Model**: хранит и обрабатывает данные приложения, взаимодействует с сервером.
- **View**: отображает данные, предоставляет интерфейс для взаимодействия с пользователем.
- **Presenter**: реагирует на действия пользователя, обновляет модель и инициирует обновление представления.

## Взаимодействие частей

1. Пользователь взаимодействует с **View** (например, кликает на элемент).
2. **View** генерирует событие и передаёт его **Presenter** через `EventEmitter`.
3. **Presenter** вызывает методы **Model** для изменения данных.
4. **Model** обновляет данные и генерирует событие через `EventEmitter`.
5. **Presenter** обрабатывает событие, запрашивает обновлённые данные из **Model** и вызывает методы **View** для обновления интерфейса.

---

## Компоненты приложения

### Базовые классы

#### Класс `Api`
**Назначение**: базовый класс для управления HTTP-запросами к серверу. Предоставляет общие методы для работы с API, включая обработку ответов и управление опциями запросов.

**Поля**:
- `baseUrl: string` - базовый URL для API-запросов.
- `options: RequestInit` - настройки запросов, включая заголовки и другие параметры.

**Методы**:
- `handleResponse(response: Response): Promise<object>` -  обработчик ответа сервера.
- `get(uri: string)` - принимает изменяющеюся часть url-адреса, возвращает ответ от сервера.
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')`- выполняет POST, PUT или DELETE-запрос на указанный URI с указанными данными.
---

#### Класс `EventEmitter`
**Назначение**: брокер событий, реализующий паттерн **Observer**.

**Поля**:
- `_events: Map<EventName, Set<Subscriber>>`- хранилище событий и связанных с ними подписчиков.

**Методы**:
- `on` - подписка на событие.
- `off`- отписка от события.
- `emit`- инициирует событие с данными.
- `onAll`- подписка на все события.
- `offAll`- сброс всех подписчиков.
- `trigger`- генерирует событие при вызове.
---

### Слой Model

### Класс `ApiClient`
**Назначение**: управление запросами к серверу.

**Поля**
- `cdn: string` - базовый URL сервера для API.
- `items: Product[]` - массив товаров типа Product.

**Методы**
- `fetchProducts()`: загружает список товаров с сеервера.
- `postOrderLot(order: OrderData)`: отправляет данные о заказе на сервер.
---

#### Класс `AppData`
**Назначение**: работа с данными, полученными с сервера.

**Поля**
- `_productsCards: Product[]` - хранит список карточек продуктов.
- `selectedCard: Product` - хранит информацию о текущей выбранной карточке товара.

**Методы**
- `get productCards()`- возвращает текущий массив товаров.
- `set productCards(data: Product[])` - устанавливает новый массив товаров и уведомляет другие части приложения о том, что данные обновлены.
- `setPreview(item: Product)`- устанавливает выбранную карточку товара для предварительного просмотра и уведомляет об этом других подписчиков.
---

#### Класс `BasketManager`
**Назначение**: предназначен для управления корзиной покупок.

**Поля**
- `basket: Product[]` - хранит список текущих товаров в корзине.

**Методы**
- `get basketProducts()`: возвращает текущий список товаров в корзине.
- `getCounter()`: возвращает количество товаров в корзине.
- `getSumAllProducts()`: рассчитывает общую сумму стоимости всех товаров в корзине.
- `addToBasket(data: Product)`: добавляет товар в корзину.
- `removeFromBasket(item: Product)`: удаляет товар из корзины.
- `clearBasket()`: очищает корзину, удаляя все товары.
---

#### Класс `OrderFormManager`
**Назначение**: предназначен для управления процессом оформления заказа.

**Поля**
- `payment: string`- хранит выбранный способ оплаты.
- `email: string` - хранит адрес электронной почты пользователя.
- `phone: string` - хранит номер телефона пользователя.
- `address: string` - хранит адрес доставки заказа.
- `basketManager: IBasketManager` - обеспечивает доступ к корзине покупок, чтобы получить список товаров и общую стоимость.

**Методы**
- `setOrderAddress(value: string): void` - устанавливает адрес доставки и проверяет состояние формы.
- `setOrderData(field: string, value: string): void` - устанавливает значение для email или телефона и проверяет состояние формы.
- `setPaymentMethod(paymentMethod: string): void` - устанавливает выбранный способ оплаты и проверяет состояние формы.
- `isFormValid(): boolean` - проверяет, заполнены ли все необходимые поля и выбран ли способ оплаты.
- `updateFormState(): void` - обновляет состояние формы (активность кнопок) и отправляет событие о текущем состоянии.
- `returnOrderLot(): object` - возвращает объект с данными заказа.
---

### Слой View

#### **Класс `BaseForm`** 
**Назначение**: является абстрактным базовым классом для создания форм. Он обеспечивает общую функциональность для работы с HTML-формами. Используется в Contacts и Order.

**Поля**: 
- `formElement: HTMLElement` - главный элемент формы, созданный из переданного шаблона.
- `inputAll: HTMLInputElement[]` - массив всех полей ввода формы.
- `buttonSubmit: HTMLButtonElement` - кнопка отправки формы.
- `buttonAll: HTMLButtonElement[]` - массив всех кнопок в форме с классом `button_alt`.
- `formErrors: HTMLElement` - элемент для отображения ошибок формы.

**Методы**: 
- `addInputListeners(): void` - добавляет слушатели событий input ко всем полям ввода
- `addSubmitListener(): void` - добавляет слушатель события submit для формы, предотвращает стандартное поведение отправки формы.
- `validateForm(): void` - проверяет правильность данных в полях ввода и устанавливают свойство isValid для кнопки отправки формы.
- `handleSubmit(): void` - определяет логику обработки отправки формы.
- `getEventNamespace(): string` - определяет уникальное пространство имен для событий.
- `set isValid(value: boolean)` - сеттер для управления состоянием кнопки отправки.
- `render(): HTMLElement` - возвращает корневой элемент формы для последующего рендера.

#### **Класс `Basket`**  
**Назначение**: представляет корзину покупок на веб-странице и содержит логику управления отображением элементов корзины.

**Поля**:  
- `basket: HTMLElement` - элемент корзины.  
- `title: HTMLElement` - заголовок корзины.
- `basketList: HTMLElement` - список товаров в корзине.
- `button: HTMLButtonElement` -  кнопка для оформления заказа.
- `basketPrice: HTMLElement` - отображение общей стоимости товаров в корзине.
- `headerBasketButton: HTMLButtonElement` - кнопка в шапке сайта, которая открывает корзину.
- `headerBasketCounter: HTMLElement` -  элемент в шапке сайта для отображения количества товаров в корзине.

**Методы**:  
- `set items(items: HTMLElement[])` - сеттер для обновления списка товаров в корзине.
- `renderHeaderBasketCounter(value: number)` - обновляет отображение количества товаров в корзине в шапке сайта.  
- `renderSumAllProducts(sumAll: number)` - обновляет общую стоимость товаров в корзине.  
- `render()` - метод для рендеринга корзины, возвращает клонированный элемент корзины для отображения на странице.   
---

#### **Класс `BasketItem`**  
**Назначение**: класс управляет отображением элемента в корзине покупок, включая информацию о товаре, цене и кнопку для его удаления из корзины.

**Поля**:  
- `basketItem: HTMLElement` - элемент для отображения товара в корзине.
- `index: HTMLElement` - элемент для отображения индекса (порядкового номера) товара в корзине.
- `title: HTMLElement` -  элемент для отображения названия товара.
- `price: HTMLElement` - элемент для отображения цены товара.
- `buttonDelete: HTMLButtonElement` - кнопка для удаления товара из корзины.

**Методы**: 
- `render(data: Product, item: number): HTMLElement` - метод для заполнения данных и отображения товара.
---

#### **Класс `ProductRender`**  
**Назначение**: предоставляет базовые методы для рендеринга данных о продукте, таких как заголовок и цена. Этот класс служит родительским для других классов, которые отображают продукты, такие как Card, BasketItem.

**Поля**: не содержит явных полей, так как его основная задача — предоставление методов для рендеринга.

**Методы**:
- `setPrice(value: number | null): string` - метод для форматирования цены.
- `renderTitle(element: HTMLElement, title: string): void` - метод для рендеринга заголовка товара.
- `renderPrice(element: HTMLElement, price: number | null): void` - метод для рендеринга цены товара.
---

#### **Класс `Card`**  
**Назначение**: предназначен для создания карточки товара, отображающей его категорию, название, изображение, цену и кнопку добавления в корзину.  

**Поля**:  
- `cardElement: HTMLElement` - элемент карточки товара.  
- `cardCategory: HTMLElement` - элемент, отображающий категорию продукта.
- `cardTitle: HTMLElement` - элемент, отвечающий за отображение названия продукта.
- `cardImage: HTMLImageElement` - элемент для отображения изображения продукта.
- `cardPrice: HTMLElement` - элемент, отображающий стоимость продукта.

**Методы**:  
- `render(data: Product): HTMLElement` - метод для заполнения данными и отображения карточки товара.  
---

#### **Класс `ProductCardPreview`**  
**Назначение**: предназначен для рендеринга карточек товаров с дополнительным функционалом предпросмотра. Он расширяет функциональность класса Card, добавляя текстовое описание товара и управление состоянием кнопки в зависимости от наличия цены.  

**Поля**: 
- `text: HTMLElement` - элемент DOM, содержащий текстовое описание товара.
- `button: HTMLButtonElement` - кнопка взаимодействия с товаром.

**Методы**:
- `handleAddToBasket(): void` - проверяет активность кнопки добавления в корзину.
- `getButtonLabel(data: Product): string` - метод для определения текста кнопки "Купить" в зависимости от наличия цены.
- `render(data: Product): HTMLElement` - метод для рендеринга карточки товара с переданными данными.
---

#### **Класс `Contacts`**  
**Назначение**: предназначен для управления формой контактов. Наследуется от BaseForm.

**Поля**:
- `emailFilled` - отслеживает, заполнено ли поле электронной почты.
- `phoneFilled` - отслеживает, заполнено ли поле для ввода номера телефона.

**Методы**:  
- `getEventNamespace(): string` - метод возвращает уникальное пространство имен для событий формы. В данном случае это "contacts".
- `handleSubmit(): void` - метод обрабатывает отправку формы. Эмитирует событие 'success:open', чтобы открыть модальное окно с сообщением об успешной отправке формы.
- `validateForm(): void` - проверяет заполнение полей электронной почты и номера телефона.
- `emailInput(email: string)` - метод для проверки валидности email.
- `phoneInput(phone: string)` - метод для проверки валидности номера телефона.
---


#### **Класс `Modal`**  
**Назначение**: управление отображением модальных окон.  

**Поля**:  
- `modalElement: HTMLElement` - элемент модального окна.  
- `contentElement: HTMLElement` - контейнер для контента модального окна.
- `closeButton: HTMLButtonElement` - кнопка закрытия модального окна.
- `pageWrapper: HTMLElement`- элемент, оборачивающий страницу, используется для блокировки прокрутки.

**Методы**:  
- `open(): void` - открывает модальное окно.  
- `close(): void` - закрывает модальное окно.  
- `setContent(value: HTMLElement | null): void` - устанавливает содержимое модального окна.  
- `set locked(value: boolean): void` - блокирует или разблокирует прокрутку страницы.
- `render(): HTMLElement` - отображает модальное окно, вызывая метод open.
--- 

#### **Класс `Order`** 
**Назначение**: предназначен для управления формой заказа, включая выбор способа оплаты и обработку отправки формы. Наследуется от BaseForm.

**Поля**:
- `paymentMethod: string | null` - хранит выбранный способ оплаты.
- `addressFilled: boolean` - поле, которое отслеживает, был ли введен адрес доставки.

**Методы**: 
- `getEventNamespace(): string`- используется для привязки событий к уникальному идентификатору формы заказа.
- `handleSubmit(): void` - позволяет связать форму заказа с дальнейшими шагами процесса оформления.
- `paymentSelection(paymentMethod: string): void` - управляет визуальной обратной связью и состоянием формы при выборе способа оплаты.
- `addressInput(address: string)` - этот метод принимает строку с адресом и проверяет, не является ли она пустой.
---

#### **Класс `Success`**  
**Назначение**: отображение сообщения об успешном завершении заказа.

**Поля**:  
- `successElement: HTMLElement` - элемент для отображения сообщения.  
- `messageElement: HTMLElement` - элемент для текста сообщения.  
- `button: HTMLButtonElement` - кнопка для закрытия сообщения об успешной операции.

**Методы**:  
- `render(total: number): HTMLElement` - возвращает корневой элемент success.  
---

### **Слой Presenter**
Код, относящийся к слою **Presenter**, реализован в основном скрипте приложения (`index.ts`).
---

## Пример взаимодействия компонентов

**Сценарий: добавление товара в корзину**

1. Пользователь нажимает кнопку "Добавить в корзину" на карточке товара в View (например, в **ProductCardPreview**).
2. В View компонента **ProductCardPreview** генерируется событие `card:addBasket`, которое передается через EventEmitter в Presenter.
3. **Presenter** подписан на событие `card:addBasket`.
4. **BasketManager** добавляет товар в массив `basket` и пересчитывает количество товаров в корзине, генерирует событие через **EventEmitter**, чтобы обновить отображение корзины на экране.
5. **View** обновляет отображение корзины. **Presenter** получает обновленные данные из **BasketManager** и обновляет отображение в BasketView. BasketView обновляет счетчик товаров в шапке сайта и отображает измененную корзину.
6. Модальное окно с превью карточки товара закрывается.
---

## Данные и типы

Данные и типы:

1. **Типы данных**:

- `Product` - представляет товар с полями, такими как id, title, price, image, description, category.
- `BasketManager` - управляет состоянием корзины.

2. **Данные**:

- `basket`: массив товаров, добавленных в корзину.
- `counter`: количество товаров в корзине.
- `sumAll`: общая стоимость всех товаров в корзине.

## Реализация процессов через события

Добавление товара в корзину:

- **View** генерирует событие `card:addBasket`.
- **Presenter** обрабатывает это событие, передает данные в **BasketManager**.
- **BasketManager** добавляет товар в массив корзины, обновляет счетчик и сумму товаров и генерирует событие `basket:updated`.
- **Presenter** снова обрабатывает событие, обновляя представление корзины.
- После того как товар добавлен в корзину, модальное окно с превью товара закрывается с помощью метода `modal.close()`.


