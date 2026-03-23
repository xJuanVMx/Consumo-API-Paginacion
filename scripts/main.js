import { loadUsers, goNextPage, goPrevPage } from "./service.js";
import { renderUsers, renderInfo, renderPagination } from "./ui.js";
import { getState, setState } from "./state.js";
import { getLocalStorageValue } from "./persistence.js";

async function init() {
    const usersGuardados = getLocalStorageValue("users");

    if (usersGuardados) {
        setState("users", usersGuardados);
        renderUsers();
        renderInfo();
        renderPagination();
    }

    const ok = await loadUsers();

    if (ok) {
        renderUsers();
        renderInfo();
        renderPagination();
    }
}

async function cambiarPagina(delta) {
    const page = getState("page");
    const total = getState("total");
    const limit = getState("limit");

    const totalPages = Math.ceil(total / limit);

    let nueva = page + delta;

    if (nueva < 0) nueva = 0;
    if (nueva >= totalPages) nueva = totalPages - 1;

    setState("page", nueva);

    const ok = await loadUsers();

    if (ok) {
        renderUsers();
        renderInfo();
        renderPagination();
    }
}

document.addEventListener("DOMContentLoaded", () => {

    init();

    document.getElementById("btnNext").addEventListener("click", async () => {
        const ok = await goNextPage();

        if (ok) {
            renderUsers();
            renderInfo();
            renderPagination();
        }
    });

    document.getElementById("btnPrev").addEventListener("click", async () => {
        const ok = await goPrevPage();

        if (ok) {
            renderUsers();
            renderInfo();
            renderPagination();
        }
    });

    document.getElementById("limit").addEventListener("change", async (e) => {
        const nuevoLimit = Number(e.target.value);

        setState("limit", nuevoLimit);
        setState("page", 0);

        const ok = await loadUsers();

        if (ok) {
            renderUsers();
            renderInfo();
            renderPagination();
        }
    });

    document.getElementById("mas2").addEventListener("click", () => cambiarPagina(2));
    document.getElementById("menos2").addEventListener("click", () => cambiarPagina(-2));
    document.getElementById("mas5").addEventListener("click", () => cambiarPagina(5));
    document.getElementById("menos5").addEventListener("click", () => cambiarPagina(-5));

});