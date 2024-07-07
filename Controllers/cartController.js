class CartController {
  static addToCart(itemId, quantity) {
    Cart.addItem(new Cart(itemId, quantity));
  }

  // static removeFromCart(itemId) {
  //   Cart.removeItem(itemId);
  //   alert("Product removed from cart");
  //   location.reload();
  // }

  static removeFromCart(itemId) {
    let confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      Cart.removeItem(itemId);
      CartController.renderCartItems();
      // update cart icon notification
      CartController.updateCartIcon();
    } else {
      return;
    }
  }

  static renderCartItems() {
    const cartItems = Cart.getCartItems();
    const cartItemsContainer = document.getElementById("cart-items");
    const bodyContainer = document.querySelector(".cart");
    cartItemsContainer.innerHTML = "";
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        const product = Product.getProductById(item.itemId);
        const cartItem = `
           <div class="card my-4 p-2">
            <div class="row g-4 align-items-center">
              <div class="col-6 col-md-4 border-end h-50">
                <img
                  src="../assets/images/${product.imgName}"
                  class="img-fluid rounded-4 p-2"
                  alt="..."
                />
              </div>
              <div class="col-6 col-md-8">
                <div class="card-body">
                  <h6 class="card-title">${product.name}</h6>
                  <h4>${product.price} <span class="currency">EGP</span></h4>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">
                    <small class="text-body-secondary"
                      ><i class="bi bi-box-seam-fill"></i> Delivered within a week</small
                    >
                  </p>
                  <div class="d-flex justify-content-start mt-4 gap-2 col-xl-4">
                    <input
                      class="form-control form-control-sm quantity-btn"
                      type="number"
                      name="fnumber"
                      min="1"
                      max="30"
                      value="${item.quantity}"
                      step="1"
                      onchange="Cart.updateItem(${item.itemId}, this.value); CartController.updateSummary();"
                      oninput="CartController.checkInputValue(this)"
                    />
                    <button class="btn btn-danger col-4" id="delete-btn" onclick="CartController.removeFromCart(${item.itemId})"><i class="bi bi-trash3-fill"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
        cartItemsContainer.innerHTML += cartItem;
      });

      CartController.updateSummary();
    } else {
      bodyContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-5 '>There are no items in your cart.</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-cart-x'></i></div>`;
    }
  }

  static updateCartIcon() {
    const cart = Cart.getCartItems();
    if (cart.length > 0) {
      const notif = document.querySelector("#notification");
      notif.classList.add("bg-danger");
      notif.textContent = `${cart.length}`;
    }
  }

  static changeIcon(button) {
    const icon = button.querySelector("i.bi");

    if (icon.classList.contains("bi-cart-plus-fill")) {
      icon.classList.remove("bi-cart-plus-fill");
      icon.classList.add("bi-cart-check-fill");
      button.classList.remove("btn-primary");
      button.classList.add("btn-success");
    }
  }

  static checkInputValue(input) {
    let value = parseInt(input.value, 10); // Convert input value to integer
    if (value === 0) input.value = "1"; // Set to 1 if input is 0
    if (value > 30) input.value = "30"; // Cap at 30 if input exceeds 30
  }

  static updateSummary() {
    const cartItems = Cart.getCartItems();
    const total = cartItems.reduce((sum, item) => {
      const product = Product.getProductById(item.itemId);
      return sum + item.quantity * product.price;
    }, 0);
    document.getElementById(
      "sub-total"
    ).innerHTML = ` <span class="currency">EGP</span> ${total.toFixed(2)}`;
    document.getElementById(
      "total"
    ).innerHTML = ` <span class="currency">EGP</span> ${(
      total +
      (total * 14) / 100
    ).toFixed(2)}`;
  }

  //   static renderCheckout() {
  //     const cartItems = Cart.getCartItems();
  //     const checkoutBody = document.querySelector(".cart .row");
  //     if (cartItems.length > 0) {
  //       checkoutBody.innerHTML = `
  // <div class="container">
  //   <h3 class="mb-4">Checkout</h3>
  //   <div id="cart-items" class="col-lg-7 border rounded p-4">
  //     <form>
  //       <div class="form-group">
  //         <label for="fullName">Full Name</label>
  //         <input type="text" class="form-control" id="fullName" placeholder="Enter your full name" required>
  //       </div>
  //       <div class="form-group mt-3">
  //         <label for="email">Email address</label>
  //         <input type="email" class="form-control" id="email" placeholder="Enter email" required>
  //       </div>
  //       <div class="form-group mt-3">
  //         <label for="address">Address</label>
  //         <input type="text" class="form-control" id="address" placeholder="Enter your address" required>
  //       </div>
  //       <div class="form-row mt-3">
  //         <div class="form-group col-md-6">
  //           <label for="city">City</label>
  //           <input type="text" class="form-control" id="city" required>
  //         </div>
  //         <div class="form-group mt-3">
  //           <label for="zip">ZIP Code</label>
  //           <input type="text" class="form-control" id="zip" required>
  //         </div>
  //       </div>
  //       <div class="form-group mt-3">
  //         <label for="payment">Payment Method</label>
  //         <select class="form-control" id="payment">
  //           <option>Credit Card</option>
  //           <option>PayPal</option>
  //           <option>Stripe</option>
  //         </select>
  //       </div>
  //       <button type="submit" class="btn btn-primary mt-3">Place Order</button>
  //     </form>
  //   </div>
  // </div>
  //       `;
  //     }
  //   }
}
