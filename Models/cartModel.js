class Cart {
  constructor(itemId, quantity) {
    this.itemId = itemId;
    this.quantity = quantity;
  }

  static getCartItems() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }

  static saveCartItems(items) {
    localStorage.setItem("cart", JSON.stringify(items));
  }

  static addItem(item) {
    const items = Cart.getCartItems();
    const existingItem = items.find((i) => i.itemId === item.itemId);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }
    Cart.saveCartItems(items);
  }

  static updateItem(id, quantity) {
    const items = Cart.getCartItems();
    const item = items.find((i) => +i.itemId === id);
    if (item) {
      item.quantity = +quantity;
      Cart.saveCartItems(items);
    }
  }

  static removeItem(id) {
    let cartItems = Cart.getCartItems();
    cartItems = cartItems.filter((item) => item.itemId != id);
    Cart.saveCartItems(cartItems);
  }
}
