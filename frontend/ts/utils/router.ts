import { HomePage } from "@/views/pages/HomePage.js";
import { NotFoundPage } from "@/views/pages/NotFoundPage.js";

const routes: Record<string, () => HTMLElement | Promise<HTMLElement>> = {
    "/": HomePage,
    "/404": NotFoundPage,
    "/playlist": async () => {
        const module = await import("@/views/pages/PlaylistPage.js");
        return module.PlaylistPage();
    },
    "/profile": async () => {
        const module = await import("@/views/pages/ProfilePage.js")
        return module.ProfilePage();
    }    
};

export const render = async () => {
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = "";
    const path = window.location.pathname;

    const routeFunction = routes[path] || routes["/404"];
    try {
        const viewElement = await routeFunction();
        app.appendChild(viewElement);

    } catch (error) {
        app.innerHTML = "<h1>Error crítico cargando la aplicación</h1>";
    }

}

export const navigateTo = (path: string) => {
    if (window.location.pathname === path) {
        return;
    }
    window.history.pushState({}, "", path);
    render();
}