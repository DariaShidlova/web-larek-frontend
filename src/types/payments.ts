class PaymentForm {
    private paymentFormElement: HTMLFormElement;
    private submitButton: HTMLButtonElement;

    constructor(formSelector: string) {
        this.paymentFormElement = document.querySelector(formSelector) as HTMLFormElement;
        this.submitButton = this.paymentFormElement.querySelector('.order__button') as HTMLButtonElement;

        this.initFormValidation();
    }

    // Валидация формы
    private initFormValidation(): void {
        this.paymentFormElement.addEventListener('input', () => {
            const email = this.paymentFormElement.querySelector('input[name="email"]') as HTMLInputElement;
            const phone = this.paymentFormElement.querySelector('input[name="phone"]') as HTMLInputElement;
            const isValid = email.value.trim().length > 0 && phone.value.trim().length > 0;
            this.toggleSubmitButton(isValid);
        });
    }

    // Включить/выключить кнопку "Оплатить"
    private toggleSubmitButton(isValid: boolean): void {
        if (isValid) {
            this.submitButton.disabled = false;
        } else {
            this.submitButton.disabled = true;
        }
    }
}

new PaymentForm('.contacts');
