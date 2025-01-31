import { IEvents } from '../base/events';
import { FormErrors, IBasketManager, IOrderFormManager } from '../../types/index';

export class OrderFormManager implements IOrderFormManager {
  private payment = '';
  private email = '';
  private phone = '';
  private address = '';
  private errors: FormErrors = {};

  constructor(protected events: IEvents) {
    this.validateOrder();
    this.validateContacts();
  }

  setOrderAddress(value: string): void {
    this.address = value.trim();
    this.validateOrder();
    this.updateOrderState();
  }

  setOrderData(field: string, value: string): void {
    if (field === 'email') {
      this.email = value.trim();
    } else if (field === 'phone') {
      this.phone = value.trim();
    }
    this.validateContacts();
    this.updateContactState();
  }

  setPaymentMethod(paymentMethod: string): void {
    this.payment = paymentMethod;
    this.updateOrderState();
  }

  validateOrder(): void {
    this.errors = {};
    if (!this.address) {
      this.errors.address = 'Введите адрес доставки';
    }
    this.events.emit('order:validationErrors', this.errors);
  }

  validateContacts(): void {
    this.errors = {};
    if (!this.email) {
      this.errors.email = 'Введите email';
    }
    if (!this.phone) {
      this.errors.phone = 'Введите номер телефона';
    }
    this.events.emit('contacts:validationErrors', this.errors);
  }

  isOrderValid(): boolean {
    return !!this.address && !!this.payment;
  }

  isContactValid(): boolean {
    return !!this.email && !!this.phone;
  }
  
  updateOrderState(): void {
    this.events.emit('order:stateChange', { isValid: this.isOrderValid() });
  }

  updateContactState(): void {
    this.events.emit('contacts:stateChange', { isValid: this.isContactValid() });
  }
 
  getFormState(): {
    isOrderValid: boolean;
    isContactValid: boolean;
    data: {
      payment: string;
      email: string;
      phone: string;
      address: string;
    };
  } {
    return {
      isOrderValid: this.isOrderValid(),
      isContactValid: this.isContactValid(),
      data: {
        payment: this.payment,
        email: this.email,
        phone: this.phone,
        address: this.address,
      },
    };
  }
}
