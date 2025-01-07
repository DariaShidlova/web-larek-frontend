import { IEvents } from "../base/events";
import { ensureElement, isBoolean } from "../../utils/utils";
import { IModal } from "../../types";

export class Modal implements IModal {
   modalElement: HTMLElement;
   contentElement: HTMLElement;
   closeButton: HTMLButtonElement;
   pageWrapper: HTMLElement;
  // protected events: IEvents;
  

  constructor(modalElement: HTMLElement | string, protected events: IEvents) {
    this.modalElement = ensureElement(modalElement);
    this.contentElement = ensureElement(".modal__content", this.modalElement);
    this.closeButton = ensureElement<HTMLButtonElement>(".modal__close", this.modalElement);
    this.pageWrapper = ensureElement(".page__wrapper");
    // this.events = events;

    this.closeButton.addEventListener('click', this.close.bind(this));
    this.modalElement.addEventListener('click', this.close.bind(this));
    ensureElement(".modal__container", this.modalElement).addEventListener("click", (event) => event.stopPropagation());
  }

  open(): void {
    this.modalElement.classList.add("modal_active");
    this.events.emit("modal:open");
  }

  close(): void {
    this.modalElement.classList.remove("modal_active");
    this.setContent(null);
    this.events.emit("modal:close");
  }

  setContent(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  set locked(value: boolean) {
    if (value) {
      this.pageWrapper.classList.add("page__wrapper_locked");
    } else {
      this.pageWrapper.classList.remove("page__wrapper_locked");
    }
  }

  render(): HTMLElement {
    this.contentElement;
    this.open();
    return this.modalElement;
  }
}
