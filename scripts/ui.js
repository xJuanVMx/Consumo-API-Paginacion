import { getState, setState } from "./state.js";
import { loadUsers } from "./service.js";

export function renderUsers() {
    const users = getState("users");
    const contenedor = document.getElementById("resultado");

    contenedor.innerHTML = "";

    if (!users || users.length === 0) {
        contenedor.innerHTML = "<p>No hay usuarios</p>";
        return;
    }

    users.forEach(u => {
        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${u.image}" alt="${u.firstName}">
            <h3>${u.firstName} ${u.lastName}</h3>
            <p>${u.email}</p>
            <p>Edad: ${u.age}</p>
        `;

        contenedor.appendChild(div);
    });
}

export function renderPagination() {
    const contenedor = document.getElementById("paginacion");
    contenedor.innerHTML = "";

    const page = getState("page");
    const total = getState("total");
    const limit = getState("limit");

    if (total === 0) return;

    const totalPages = Math.ceil(total / limit);

    const btnInicio = document.createElement("button");
    btnInicio.textContent = "<<";
    btnInicio.addEventListener("click", async () => {
        setState("page", 0);
        const ok = await loadUsers();
        if (ok) {
            renderUsers();
            renderInfo();
            renderPagination();
        }
    });
    contenedor.appendChild(btnInicio);

    for (let i = 0; i < totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i + 1;

        if (i === page) {
            btn.classList.add("activa");
        }

        btn.addEventListener("click", async () => {
            setState("page", i);
            const ok = await loadUsers();
            if (ok) {
                renderUsers();
                renderInfo();
                renderPagination();
            }
        });

        contenedor.appendChild(btn);
    }

    const btnFinal = document.createElement("button");
    btnFinal.textContent = ">>";
    btnFinal.addEventListener("click", async () => {
        setState("page", totalPages - 1);
        const ok = await loadUsers();
        if (ok) {
            renderUsers();
            renderInfo();
            renderPagination();
        }
    });
    contenedor.appendChild(btnFinal);
}

export function renderInfo() {
    const page = getState("page");
    const limit = getState("limit");
    const total = getState("total");

    if (total === 0) {
        document.getElementById("info").textContent = "Sin datos";
        return;
    }

    const totalPages = Math.ceil(total / limit);

    document.getElementById("info").textContent =
        `Página ${page + 1} de ${totalPages}`;
}