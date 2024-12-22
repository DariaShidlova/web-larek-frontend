import { Component } from './Component';

export class Modal extends Component {
    render(): void {
        throw new Error('Method not implemented.');
    }
    private isVisible = false;

    constructor(element: HTMLElement) {
        super(element);
    }

    open(content: HTMLElement) {
        this.element.innerHTML = '';
        this.element.appendChild(content);
        this.isVisible = true;
        this.element.classList.add('modal_active');
    }

    close() {
        this.isVisible = false;
        this.element.classList.remove('modal_active');
    }

    setContent(content: HTMLElement) {
        this.element.innerHTML = '';
        this.element.appendChild(content);
    }
}