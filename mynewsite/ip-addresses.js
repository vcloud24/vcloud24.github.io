const ipAddresses = [];

function addIPAddress(ip) {
    if (!ipAddresses.includes(ip)) {
        ipAddresses.push(ip);
    }
}
