class AuthController {
    static login(username, password) {
        const user = User.authenticate(username, password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'home.html';
        } else {
            alert('Invalid username or password');
        }
    }

    static register(username, password, role) {
        const users = User.getUsers();
        const newUser = new User(users.length + 1, username, password, role);
        User.addUser(newUser);
        alert('Registration successful. Please log in.');
        window.location.href = 'login.html';
    }

    static logout() {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }

    static getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }
}
