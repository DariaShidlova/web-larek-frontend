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

### Слой Model

#### Класс `AppData`
**Назначение**: управление данными приложения, работа с данными сервера и локальными данными.

**Поля**:

-`serverUrl: string` - базовый URL сервера для API.
-`userData: ContactData | null` - данные пользователя для сохранения и валидации.
-`basket: BasketItem[]` - текущие товары в корзине.

**Конструктор**: принимает объект конфигурации с параметрами сервера.

**Методы**:
- `getProducts()`: получает список товаров с сервера.
- `getProductDetails(id: number)`: получает данные о конкретном товаре.
- `addToBasket(productId: number)`: добавляет товар в корзину.
- `removeFromBasket(productId: number)`: удаляет товар из корзины.
- `submitOrder(orderData: OrderData)`: отправляет данные заказа на сервер.
- `saveUserData(userData: ContactData): void` - сохраняет данные пользователя.
- `validateUserData(): boolean` - проверяет корректность данных пользователя.
- `getBasketItems(): BasketItem[]` - возвращает текущий список товаров в корзине.
---

#### Класс `EventEmitter`
**Назначение**: брокер событий, реализующий паттерн **Observer**.

**Методы**:
- `on(event: string, listener: Function)`: подписка на событие.
- `off(event: string, listener: Function)`: отписка от события.
- `emit(event: string, data?: any)`: генерация события.

### Слой View

#### Базовый класс `Component`
**Назначение**: базовый класс для всех компонентов представления.

**Поля**:
- `element: HTMLElement` - DOM элемент компонента.

**Методы**:
- `render()`: отрисовка компонента.
- `bindEvents()`: привязка обработчиков событий.

#### Классы, наследуемые от `Component`:

#### **Класс `Modal`**  
**Назначение**: управление отображением модальных окон.  

**Поля**:  
- `modalElement: HTMLElement` - элемент модального окна.  
- `contentElement: HTMLElement` - контейнер для контента модального окна.  
- `isVisible: boolean` - флаг видимости модального окна.  

**Методы**:  
- `open(content: HTMLElement): void` - открывает модальное окно с указанным контентом.  
- `close(): void` - закрывает модальное окно.  
- `setContent(content: HTMLElement): void` - обновляет содержимое модального окна.  

---

#### **Класс `Basket`**  
**Назначение**: отображение корзины товаров.

**Поля**:  
- `basketElement: HTMLElement` - элемент корзины.  
- `items: Product[]` - текущий список товаров в корзине.  
- `totalPriceElement: HTMLElement` - элемент для отображения общей стоимости.  

**Методы**:  
- `renderBasketItems(items: Product[]): void` - отображает список товаров в корзине.  
- `updateTotalPrice(price: number): void` - обновляет общую стоимость товаров.  
- `clearBasket(): void` - очищает корзину.  

---

#### **Класс `Form`**  
**Назначение**: отображение формы оплаты.  

**Поля**:  
- `formElement: HTMLFormElement` - элемент формы.  
- `fields: { [key: string]: HTMLInputElement }` - поля формы.  
- `submitButton: HTMLButtonElement` - кнопка отправки формы.  

**Методы**:  
- `getFormData()` - передача данных формы.
- `submitForm(): void` - отправляет данные формы.  
- `onSubmit(callback: (formData: FormData) => void): void` - добавляет обработчик нажатия кнопки отправки.  
- `resetForm(): void` - очищает поля формы.  

---

#### **Класс `Success`**  
**Назначение**: отображение сообщения об успешном завершении заказа.

**Поля**:  
- `successElement: HTMLElement` - элемент для отображения сообщения.  
- `messageElement: HTMLElement` - элемент для текста сообщения.  

**Методы**:  
- `showSuccessMessage(message: string): void` - отображает сообщение об успехе.  
- `hideMessage(): void` - скрывает сообщение.  

---

#### **Класс `Page`**  
**Назначение**: управление содержимым страницы.

**Поля**:  
- `contentElement: HTMLElement` - основной контейнер для контента страницы.  
- `basketCounterElement: HTMLElement` - элемент для отображения количества товаров в корзине.  

**Методы**:  
- `renderPageContent(content: HTMLElement): void` - отображает основной контент страницы.  
- `updateBasketCounter(count: number): void` - обновляет счётчик корзины.  
- `scrollToTop(): void` - прокручивает страницу наверх.  

---

#### **Класс `Card`**  
**Назначение**: отображение карточки товара.  

**Поля**:  
- `cardElement: HTMLElement` - элемент карточки товара.  
- `productDetails: Product | null` - данные о текущем товаре.  
- `addButton: HTMLButtonElement` - кнопка "Купить".  

**Методы**:  
- `setProductDetails(details: Product): void` - задаёт данные товара для отображения.  
- `onAddToBasket(callback: (productId: number) => void): void` - добавляет обработчик нажатия кнопки "Купить".  
- `render(): void` - отрисовывает карточку товара.  

---

#### **Класс `Order`**  
**Назначение**: управление отображением формы заказа.

**Поля**:  
- `orderElement: HTMLElement` - элемент формы заказа.  
- `orderDetails: Order | null` - данные текущего заказа.  

**Методы**:  
- `setOrderDetails(order: Order): void` - задаёт данные заказа.  
- `renderOrderSummary(): void` - отображает краткое содержание заказа.  
- `onSubmit(callback: (orderData: OrderData) => void): void` - добавляет обработчик нажатия кнопки отправки заказа.  

---

#### **Класс `Contacts`**  
**Назначение**: управление отображением и валидацией контактных данных пользователя.

**Поля**:  
- `contactElement: HTMLElement` - элемент формы контактов.  
- `fields: { email: HTMLInputElement; phone: HTMLInputElement }` - поля для ввода контактных данных.  

**Методы**:  
- `validateContacts(data: ContactData): boolean` - проверяет корректность контактной информации.  
- `getContactData(): ContactData` - возвращает введённые данные.  
- `onChange(callback: (data: ContactData) => void): void` - добавляет обработчик изменения данных.  

---

### **Слой Presenter**
Код, относящийся к слою **Presenter**, реализован в основном скрипте приложения (`index.ts`).

---

## Пример взаимодействия компонентов

**Сценарий: добавление товара в корзину**

1. Пользователь кликает на кнопку "Купить" в карточке товара (**View: Card**).
2. **Card** вызывает `emit('addToBasket', productId)` через `EventEmitter`.
3. **Presenter** обрабатывает событие, вызывает `addToBasket(productId)` в **AppData (Model)**.
4. **AppData** обновляет список товаров в корзине и генерирует событие `basketUpdated`.
5. **Presenter** обрабатывает событие `basketUpdated` и выполняет следующие действия:
- Вызывает`renderBasketItems` в **Basket (View)** для обновления списка товаров в корзине.
- Вызывает `updateBasketCounter` в **Page (View)** для обновления счётчика товаров в шапке страницы.
- 
6. **Basket** обновляет отображение списка товаров в корзине.
7. **Page** обновляет отображение счетчика товаров в шапке страницы.

---

## Данные и типы

- **`Product`**: описание товара.
  - **Поля**: `id`, `name`, `description`, `price`, `category`, `imageUrl`.
  - **Используется в**: `AppData`, `Card`, `Basket`.

- **`OrderData`**: данные заказа.
  - **Поля**: `products: Product[]`, `address: string`, `paymentMethod: string`.
  - **Используется в**: `AppData`, `Form`.

- **`ContactData`**: контактные данные пользователя.
  - **Поля**: `email: string`, `phone: string`.
  - **Используется в**: `Contacts`.

---

## Реализация процессов через события

- **Добавление товара в корзину**:
  - **Событие**: `addToBasket`.
  - **Источник**: `Card`.
  - **Обработчик**: `AppData.addToBasket` через **Presenter**.

- **Обновление корзины**:
  - **Событие**: `basketUpdated`.
  - **Источник**: `AppData`.
  - **Обработчик**: `Basket.renderBasketItems` через **Presenter**.
