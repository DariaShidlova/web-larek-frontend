import { IEvents } from "../base/events";
import { ensureElement, cloneTemplate } from "../../utils/utils";
import { ISuccess } from '../../types/index';

export class Success implements ISuccess {
  successElement: HTMLElement;
  messageElement: HTMLElement;
  button: HTMLButtonElement;

  constructor(template: HTMLTemplateElement, protected events: IEvents) {

    this.successElement = cloneTemplate<HTMLElement>(template);

    this.messageElement = ensureElement<HTMLElement>('.order-success__description', this.successElement);
    this.button = ensureElement<HTMLButtonElement>('.order-success__close', this.successElement);

    this.button.addEventListener('click', () => this.events.emit('success:close'));
  }

  render(total: number) {
    this.messageElement.textContent = `Списано ${total} синапсов`;
    return this.successElement
  }
}
