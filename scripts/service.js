import { setState, getState } from "./state.js";
import { setLocalStorageValue } from "./persistence.js";

const URL = "https://dummyjson.com/users";

export async function loadUsers() {
    try {
        document.getElementById("loading").style.display = "block";

        if (Math.random() < 0.3) {
            throw new Error("Error simulado de conexión");
        }

        const limit = getState("limit");
        const page = getState("page");
        const skip = limit * page;

        const res = await fetch(`${URL}?limit=${limit}&skip=${skip}`);
        const data = await res.json();

        setState("users", data.users);
        setState("total", data.total);

        setLocalStorageValue("users", data.users);

        return true;

    } catch (error) {
        document.getElementById("resultado").innerHTML =
            `<p style="color:red;">❌ ${error.message}</p>`;

        return false;

    } finally {
        document.getElementById("loading").style.display = "none";
    }
}

export async function goNextPage() {
    const currentPage = getState("page");
    const total = getState("total");
    const limit = getState("limit");

    const totalPages = Math.ceil(total / limit);

    const newPage = currentPage + 1;
    const page = newPage < totalPages ? newPage : totalPages - 1;

    setState("page", page);

    return await loadUsers();
}

export async function goPrevPage() {
    const currentPage = getState("page");

    const newPage = currentPage - 1;
    const page = newPage < 0 ? 0 : newPage;

    setState("page", page);

    return await loadUsers();
}