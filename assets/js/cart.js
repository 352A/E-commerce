document.addEventListener("DOMContentLoaded", () => {
  // Handle adding products to cart
  if (document.getElementById("add-to-cart-form")) {
    document
      .getElementById("add-to-cart-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const productId = document.getElementById("product-id").value;
        const quantity = document.getElementById("quantity").value;
        CartController.addToCart(productId, quantity);
      });
  }

  // Load cart items on cart page
  if (document.getElementById("cart-items")) {
    CartController.renderCartItems();
  }

  // Handle checkout process
  if (document.getElementById("checkout-form")) {
    document
      .getElementById("checkout-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const shippingDetails = {
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          zip: document.getElementById("zip").value,
        };
        const payment = document.getElementById("payment").value;
        OrderController.checkout(shippingDetails, payment);
      });
  }
});
