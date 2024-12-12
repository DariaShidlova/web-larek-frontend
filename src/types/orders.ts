class OrderForm {
    private orderFormElement: HTMLFormElement;
    private nextButton: HTMLButtonElement;

    constructor(formSelector: string) {
        this.orderFormElement = document.querySelector(formSelector) as HTMLFormElement;
        this.nextButton = this.orderFormElement.querySelector('.order__button') as HTMLButtonElement;

        this.initFormValidation();
    }

    // Валидация формы
    private initFormValidation(): void {
        this.orderFormElement.addEventListener('input', () => {
            const address = this.orderFormElement.querySelector('input[name="address"]') as HTMLInputElement;
            const isValid = address.value.trim().length > 0;
            this.toggleNextButton(isValid);
        });
    }

    // Включить/выключить кнопку "Далее"
    private toggleNextButton(isValid: boolean): void {
        if (isValid) {
            this.nextButton.disabled = false;
        } else {
            this.nextButton.disabled = true;
        }
    }
}

new OrderForm('.order');
