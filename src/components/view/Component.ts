export abstract class Component {
    protected element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    abstract render(): void;

    protected bindEvents() {}
}