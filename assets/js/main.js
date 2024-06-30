document.addEventListener('DOMContentLoaded', () => {
    // Handle registration form submission
    if (document.getElementById('registration-form')) {
        document.getElementById('registration-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;
            AuthController.register(username, password, role);
        });
    }

    // Handle login form submission
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            AuthController.login(username, password);
        });
    }

    // Load featured products on home page
    if (document.getElementById('featured-products')) {
        const products = Product.getProducts();
        const featuredProducts = products.slice(0, 4); // Example: get the first 4 products
        const featuredProductsContainer = document.getElementById('featured-products');

        featuredProducts.forEach(product => {
            const productCard = `
                <div class="col-md-3">
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">$${product.price}</p>
                            <a href="productDetails.html?id=${product.id}" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            `;
            featuredProductsContainer.innerHTML += productCard;
        });
    }

    // Handle adding products to cart
    if (document.getElementById('add-to-cart-form')) {
        document.getElementById('add-to-cart-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const productId = document.getElementById('product-id').value;
            const quantity = document.getElementById('quantity').value;
            CartController.addToCart(productId, quantity);
        });
    }

    // Load cart items on cart page
    if (document.getElementById('cart-items')) {
        const cartItems = CartController.getCartItems();
        const cartItemsContainer = document.getElementById('cart-items');

        cartItems.forEach(item => {
            const product = Product.getProductById(item.productId);
            const cartItem = `
                <tr>
                    <td>${product.name}</td>
                    <td>${item.quantity}</td>
                    <td>$${product.price}</td>
                    <td>$${item.quantity * product.price}</td>
                    <td><button class="btn btn-danger" onclick="CartController.removeFromCart(${item.productId})">Remove</button></td>
                </tr>
            `;
            cartItemsContainer.innerHTML += cartItem;
        });

        const total = cartItems.reduce((sum, item) => {
            const product = Product.getProductById(item.productId);
            return sum + item.quantity * product.price;
        }, 0);
        document.getElementById('total').innerText = `Total: $${total}`;
    }

    // Handle checkout process
    if (document.getElementById('checkout-form')) {
        document.getElementById('checkout-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const shippingDetails = {
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value
            };
            OrderController.checkout(shippingDetails);
        });
    }
});

// Additional Controllers for handling cart and orders
class CartController {
    static getCartItems() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    static saveCartItems(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    static addToCart(productId, quantity) {
        const cartItems = CartController.getCartItems();
        const existingItem = cartItems.find(item => item.productId == productId);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            cartItems.push({ productId: productId, quantity: parseInt(quantity) });
        }
        CartController.saveCartItems(cartItems);
        alert('Product added to cart');
    }

    static removeFromCart(productId) {
        let cartItems = CartController.getCartItems();
        cartItems = cartItems.filter(item => item.productId != productId);
        CartController.saveCartItems(cartItems);
        alert('Product removed from cart');
        location.reload(); // Reload the page to update the cart
    }
}

class OrderController {
    static checkout(shippingDetails) {
        const cartItems = CartController.getCartItems();
        const total = cartItems.reduce((sum, item) => {
            const product = Product.getProductById(item.productId);
            return sum + item.quantity * product.price;
        }, 0);
        const user = AuthController.getCurrentUser();
        const newOrder = new Order(Date.now(), user.id, cartItems, total, shippingDetails);
        Order.addOrder(newOrder);
        localStorage.removeItem('cart');
        alert('Order placed successfully');
        window.location.href = 'orderConfirmation.html';
    }
}
