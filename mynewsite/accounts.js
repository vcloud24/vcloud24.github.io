const accounts = {};

function addAccount(username, password, birthYear, ip) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (accounts[username]) {
        return "Username is taken";
    }
    
    if (age < 8) {
        return "You must be at least 8 years old to create an account";
    }

    accounts[username] = {
        password: password,
        ip: ip,
        folder: {
            username: username,
            password: password,
            ip: ip
        }
    };

    return "Account created";
}
