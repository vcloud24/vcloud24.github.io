const accounts = [];

function addAccount(username) {
    if (accounts.includes(username)) {
        return "Username is taken";
    } else {
        accounts.push(username);
        return "Account created";
    }
}
