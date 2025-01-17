import { IEvents } from '../base/events';
import { FormErrors, IBasketManager, IOrderFormManager } from '../../types/index';

export class OrderFormManager implements IOrderFormManager {
  private payment = '';
  private email = '';
  private phone = '';
  private address = '';

  constructor(protected events: IEvents) {}

  setOrderAddress(value: string): void {
    this.address = value.trim();
    this.updateOrderState();
  }

  setOrderData(field: string, value: string): void {
    if (field === 'email') {
      this.email = value.trim();
    } else if (field === 'phone') {
      this.phone = value.trim();
    }
    this.updateContactState();
  }

  setPaymentMethod(paymentMethod: string): void {
    this.payment = paymentMethod;
    this.updateOrderState();
  }

  isOrderValid(): boolean {
    return !!this.address && !!this.payment;
  }

  isContactValid(): boolean {
    return !!this.email && !!this.phone;
  }

  updateOrderState(): void {
    const isValid = this.isOrderValid();
    this.events.emit('order:stateChange', { isValid });
  }

  updateContactState(): void {
    const isValid = this.isContactValid();
    this.events.emit('contacts:stateChange', { isValid });
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