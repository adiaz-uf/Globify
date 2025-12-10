import { HomePage } from "@/views/pages/HomePage.js";
import { NotFoundPage } from "@/views/pages/NotFoundPage.js";

const routes: Record<string, () => HTMLElement | Promise<HTMLElement>> = {
    "/": HomePage,
    "/404": NotFoundPage,
    "/playlist": async () => {
        const module = await import("../views/pages/PlaylistPage.js");
        return module.PlaylistPage();
    },
    "/profile": async () => {
        const module = await import("../views/pages/ProfilePage.js")
        return module.ProfilePage();
    }
};

export const render = async () => {
    const path = window.location.pathname;
    const isNotFound = !routes[path];

    // For 404, render in #app (full screen). For other pages, render in #view-container
    const targetId = isNotFound ? "app" : "view-container";
    const container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = "";

    const routeFunction = isNotFound ? NotFoundPage : routes[path];

    try {
        const viewElement = await routeFunction();
        container.appendChild(viewElement);
    } catch (error) {
        container.innerHTML = "<h1>Error crítico cargando la aplicación</h1>";
    }
}

export const navigateTo = (path: string) => {
    if (window.location.pathname === path) {
        return;
    }
    window.history.pushState({}, "", path);
    render();
}