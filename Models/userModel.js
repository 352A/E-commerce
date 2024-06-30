class User {
    constructor(id, username, password, role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role; // 'customer', 'seller', 'admin'
    }

    static getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    static saveUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static addUser(user) {
        const users = User.getUsers();
        users.push(user);
        User.saveUsers(users);
    }

    static authenticate(username, password) {
        const users = User.getUsers();
        return users.find(user => user.username === username && user.password === password);
    }
}
