export class Modal {
    private modalElement: HTMLElement;

    constructor(modalSelector: string) {
        this.modalElement = document.querySelector(modalSelector) as HTMLElement;
        this.initCloseListeners();
    }

    // Открыть модальное окно
    open(): void {
        this.modalElement.classList.add('modal_active');
    }

    // Закрыть модальное окно
    close(): void {
        this.modalElement.classList.remove('modal_active');
    }

    // Закрыть модальное окно при клике на область вне окна или на кнопку закрытия
    private initCloseListeners(): void {
        const closeButton = this.modalElement.querySelector('.modal__close') as HTMLElement;
        closeButton.addEventListener('click', () => this.close());

        this.modalElement.addEventListener('click', (event: Event) => {
            if (event.target === this.modalElement) {
                this.close();
            }
        });
    }
}

export const productModal = new Modal('#modal-container');
export const basketModal = new Modal('#modal-basket');
export const orderModal = new Modal('#modal-order');
