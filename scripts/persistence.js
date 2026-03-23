export function setLocalStorageValue(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageValue(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function clearLocalStorage() {
    localStorage.clear();
}