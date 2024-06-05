import { products } from "../data/products.js";

const cart = [];

let productHTML = '';

products.forEach((product) => {
    productHTML +=
    `
    <div class="item-container">
        <div class"image-container">
            <img class="item-image" src="${product.image}" alt="">
        </div>
        <div class="item-ifo">
            <p class="item-name">${product.name}</p>
            <div class="item-quantity-picker-container">
                <p class="js-par-${product.id}">Quantity:</p>
                <input type="number"  min="1" max="9" value="1" class="js-quantity-selector-${product.id}">
            </div>
            <p class="item-price">${(product.price).toFixed(2)}</p>
            <div class="add-to-cart-container">
                <button class="add-to-cart-button js-add-to-cart" data-product-id="${product.id}">
                    Add to cart
                </button>
            </div>
        </div>
    </div>
    `
});

document.querySelector('.js-main-container').innerHTML = productHTML;

let allButton = document.querySelectorAll('.js-add-to-cart');
allButton.forEach((button) => {
    button.addEventListener('click', () => {

        const productId = button.dataset.productId;
        let matchingItem;
        cart.forEach((cartItem) => {
            if (productId === cartItem.productId){
                matchingItem = cartItem
            }
        });

        const quantitySelector = document.querySelector(
            `.js-quantity-selector-${productId}`
          );
        const quantity = Number(quantitySelector.value);

        if (matchingItem){
            matchingItem.quantity += quantity;
        }else {
            cart.push({
                productId: productId,
                quantity: quantity
            });
        }
        console.log(cart);

        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
        document.querySelector('.js-cart-count').innerHTML = cartQuantity;

    });
});



