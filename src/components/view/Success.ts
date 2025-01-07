import { IEvents } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { ISuccess } from '../../types/index';

export class Success implements ISuccess {
  successElement: HTMLElement;
  messageElement: HTMLElement;
  button: HTMLButtonElement;
  // events: IEvents;

  /**
   * Инициализирует экземпляр класса Success
   */
  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    // this.events = events;

    // Клонирование шаблона успешного сообщения
    this.successElement = cloneTemplate<HTMLElement>(template);

    // Инициализация элементов внутри шаблона
    this.messageElement = ensureElement<HTMLElement>('.order-success__description', this.successElement);
    this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.successElement);

    // Установка обработчика события на кнопку закрытия
    this.button.addEventListener('click', () => this.events.emit('success:close'));
  }

  /**
   * Устанавливает текст сообщения и возвращает элемент успешного сообщения.
   */
  render(total: number) {
    this.messageElement.textContent = `Списано ${total} синапсов`;
    return this.successElement
  }
}
