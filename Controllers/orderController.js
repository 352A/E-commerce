class OrderController {
  static checkout(shippingDetails, payment) {
    const cartItems = Cart.getCartItems();
    const total = cartItems.reduce((sum, item) => {
      const product = Product.getProductById(item.itemId);
      return sum + item.quantity * product.price;
    }, 0);
    const user = AuthController.getCurrentUser();
    const status = "pending";
    const newOrder = new Order(
      Date.now(),
      User.id,
      cartItems,
      status,
      total,
      shippingDetails,
      payment
    );
    Order.addOrder(newOrder);
    cartItems.forEach((i) => {
      Product.updateProductQuantity(i.itemId, i.quantity);
    });
    localStorage.removeItem("cart");
    this.updateModal();
    // location.reload();
    // window.location.href = "orderConfirmation.html";
  }

  static updateModal() {
    const modal = document.querySelector(".modal-content");
    modal.innerHTML = `
     <div class="d-flex align-items-center mb-3">
        <h4></h4>

        <button
          type="button"
          class="btn p-1 ms-auto"
          data-bs-dismiss="modal"
        >
          <i class="bi bi-x-lg"></i>
        </button>

    </div>

        <div class="d-flex flex-column justify-content-center align-items-center">
          <h4>Order placed successfully</h4>
          <i style="font-size: 6rem" class="bi bi-check-circle text-success"></i>
        </div> 
        <a href="../Views/orders.html" class="btn btn-primary mt-4">Go To Orders</a>    
    `;
  }

  static renderOrders() {
    const orders = Order.getOrders();
    const ordersContainer = document.getElementById("orders-container");
    const bodyContainer = document.querySelector(".orders");
    let orderItems = "";
    ordersContainer.innerHTML = "";
    if (orders.length > 0) {
      orders.forEach((order) => {
        let orderTotal = 0;
        const paymentMethod = order.paymentMethod;

        order.itemId.forEach((item) => {
          const product = Product.getProductById(item.itemId);
          orderTotal += order.totalPrice;
          const deliveryDate = order.date;
          const date = new Date(deliveryDate);
          const expectedDeliveryDate = new Date(deliveryDate);
          date.setUTCDate(date.getUTCDate() + 3);
          expectedDeliveryDate.setUTCDate(
            expectedDeliveryDate.getUTCDate() + 7
          );
          const day = date.getUTCDate();
          const month = date.toLocaleString("default", { month: "long" });
          const expectedDay = expectedDeliveryDate.getUTCDate();
          const expectedMonth = expectedDeliveryDate.toLocaleString("default", {
            month: "long",
          });

          const orderItem = `
          <div id="order-items">
    <div class="card my-2 p-2">
      <div class="row g-2 align-items-center">
        <div class="col-md-4 border-end">
          <img
            src="../assets/images/${product.imgName}"
            class="img-fluid rounded-4 p-1"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body p-2">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="card-title m-0">${product.name}</h6>
              <h4 class="m-0">${order.totalPrice.toFixed(
                2
              )} <span class="currency">EGP</span></h4>
            </div>
            <p class="card-text small my-1">${product.description}</p>
            <p class="card-text small my-1">Status: <span class="text-success">${
              order.status
            }</span></p>
            <p class="card-text small my-1">
              <small class="text-muted">
                <i class="bi bi-box-seam-fill"></i> Delivered between ${day} ${month} and ${expectedDay} ${expectedMonth}
              </small>
            </p>
            <p class="card-text small my-1"><strong>Quantity:</strong> ${
              item.quantity
            }</p>
          </div>
        </div>
      </div>
    </div>
  </div>
          `;

          orderItems += orderItem;
        });
        ordersContainer.innerHTML += `
       <div class="order-wrapper card text-bg-light my-3 col-12 col-xl-7 p-3">
       
       <span class="badge text-bg-info col-xl-4 text-light">Order ID: ${
         order.orderId
       }</span>
       <h6 class="mt-3"> Total Price: <span class="fw-normal">${orderTotal.toFixed(
         2
       )}</span><small class="fw-normal"> EGP</small> </h6>
       <h6>Payment Method: <span class="fw-normal">${paymentMethod}</span> </h6>

      
        ${orderItems}
        </div>
        `;
      });
    } else {
      bodyContainer.innerHTML = `<div class="d-flex flex-column align-items-center"><h5 style="color: #888"; class='text-center mt-5 '>You have made no orders yet.</h5> <i style='font-size: 17rem; color: #eee'; class='bi bi-cart-x'></i></div>`;
    }
  }
}
