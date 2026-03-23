import { getLocalStorageValue, setLocalStorageValue } from "./persistence.js";

const state = {
    users: [],
    page: getLocalStorageValue("page") ?? 1,
    limit: getLocalStorageValue("limit") ?? 10,
    total: 0
};

export function getState(key) {
    return state[key];
}

export function setState(key, value) {
    state[key] = value;

    if (key === "page" || key === "limit") {
        setLocalStorageValue(key, value);
    }
}