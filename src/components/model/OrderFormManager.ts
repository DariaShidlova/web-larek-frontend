import { IEvents } from '../base/events';
import { FormErrors, IBasketManager, IOrderFormManager } from '../../types/index';

export class OrderFormManager implements IOrderFormManager {
  payment: string;
  email: string;
  phone: string;
  address: string;

  constructor(protected events: IEvents, private basketManager: IBasketManager) {
    this.payment = '';
    this.email = '';
    this.phone = '';
    this.address = '';
  }

  // Устанавливает адрес и проверяет состояние формы
  setOrderAddress(value: string) {
    this.address = value;
    this.updateFormState();
  }

  // Устанавливает email или телефон и проверяет состояние формы
  setOrderData(field: string, value: string) {
    if (field === 'email') {
      this.email = value;
    } else if (field === 'phone') {
      this.phone = value;
    }
    this.updateFormState();
  }

  // Устанавливает способ оплаты и проверяет состояние формы
  setPaymentMethod(paymentMethod: string) {
    this.payment = paymentMethod;
    this.updateFormState();
  }

  // Проверяет, заполнены ли все необходимые поля и выбран ли способ оплаты
  isFormValid() {
    return !!this.address && !!this.email && !!this.phone && !!this.payment;
  }

  // Обновляет состояние формы и кнопок
  updateFormState() {
    const isValid = this.isFormValid();
    this.events.emit('form:stateChange', { isValid });
  }

  // Возвращает объект с данными заказа
  returnOrderLot() {
    return {
      payment: this.payment,
      email: this.email,
      phone: this.phone,
      address: this.address,
      total: this.basketManager.getSumAllProducts(),
      items: this.basketManager.basket.map((item) => String(item.id)),
    };
  }
}
