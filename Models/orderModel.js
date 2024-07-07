class Order {
  constructor(
    orderId,
    userId,
    itemId,
    status,
    totalPrice,
    shippingAddress,
    paymentMethod
  ) {
    this.orderId = orderId;
    this.userId = userId;
    this.itemId = itemId;
    this.date = new Date();
    this.status = status;
    this.totalPrice = totalPrice;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
  }

  static getOrders() {
    return JSON.parse(localStorage.getItem("orders")) || [];
  }

  static saveOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  static addOrder(order) {
    const orders = Order.getOrders();
    orders.push(order);
    Order.saveOrders(orders);
  }

  static getOrdersByUserId(userId) {
    const orders = Order.getOrders();
    return orders.filter((order) => order.userId === userId);
  }
}
