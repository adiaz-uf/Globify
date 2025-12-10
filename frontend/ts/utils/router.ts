import { HomePage } from "../views/pages/HomePage.js";
import { NotFoundPage } from "../views/pages/NotFoundPage.js";

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
    const viewContainer = document.getElementById("view-container");
    if (!viewContainer) return;

    // Clean only view container
    viewContainer.innerHTML = "";

    const path = window.location.pathname;
    const routeFunction = routes[path] || routes["/404"];

    try {
        const viewElement = await routeFunction();
        viewContainer.appendChild(viewElement);
    } catch (error) {
        console.error("Error loading view:", error);
        viewContainer.innerHTML = "<h1>Error cargando la página</h1>";
    }
}

export const navigateTo = (path: string) => {
    if (window.location.pathname === path) {
        return;
    }
    window.history.pushState({}, "", path);
    render();
}