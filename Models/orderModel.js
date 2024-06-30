class Order {
    constructor(id, userId, items, total, shippingDetails) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.total = total;
        this.shippingDetails = shippingDetails;
    }

    static getOrders() {
        return JSON.parse(localStorage.getItem('orders')) || [];
    }

    static saveOrders(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    static addOrder(order) {
        const orders = Order.getOrders();
        orders.push(order);
        Order.saveOrders(orders);
    }

    static getOrdersByUserId(userId) {
        const orders = Order.getOrders();
        return orders.filter(order => order.userId === userId);
    }
}
