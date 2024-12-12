import './scss/styles.scss';
import { basketManager } from './types/basket';
import { Catalog } from './types/catalog';
import { Modal } from './types/modal';

document.addEventListener('DOMContentLoaded', () => {
    const catalog = new Catalog('.gallery');
    const basket = basketManager.getBasket();
});


