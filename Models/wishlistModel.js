class Wishlist {
  constructor(itemId) {
    this.itemId = itemId;
  }

  static getWishlistItems() {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  }

  static saveWishlistItems(items) {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }

  static addItem(item) {
    const items = Wishlist.getWishlistItems();
    const existingItem = items.find((i) => i.itemId === item.itemId);
    if (existingItem) {
      return;
    } else {
      items.push(item);
    }
    Wishlist.saveWishlistItems(items);
  }

  static removeItem(id) {
    let items = Wishlist.getWishlistItems();
    items = items.filter((i) => i.itemId != id);
    Wishlist.saveWishlistItems(items);
  }
}
