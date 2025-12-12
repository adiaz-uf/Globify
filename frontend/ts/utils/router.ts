import { updateNavbarActiveState } from "@/views/components/Navbar.js";
import { HomePage } from "@/views/pages/HomePage.js";
import { NotFoundPage } from "@/views/pages/NotFoundPage.js";

type RouteHandler = (params?: Record<string, string>) => HTMLElement | Promise<HTMLElement>;

const routes: Record<string, RouteHandler> = {
    "/": HomePage,
    "/404": NotFoundPage,
    "/profile": async () => {
        const module = await import("@/views/pages/ProfilePage.js");
        return module.ProfilePage();
    }
};

// Dynamic routes with parameters
const dynamicRoutes: { pattern: RegExp; handler: RouteHandler }[] = [
    {
        pattern: /^\/playlist\/([^/]+)$/,
        handler: async (params) => {
            const module = await import("@/views/pages/PlaylistPage.js");
            return module.PlaylistPage(params?.id || '');
        }
    }
];

function matchRoute(path: string): { handler: RouteHandler; params?: Record<string, string> } | null {
    // Check static routes first
    if (routes[path]) {
        return { handler: routes[path] };
    }

    // Check dynamic routes
    for (const { pattern, handler } of dynamicRoutes) {
        const match = path.match(pattern);
        if (match) {
            return { handler, params: { id: match[1] } };
        }
    }

    return null;
}

export const render = async () => {
    const path = window.location.pathname;
    const matched = matchRoute(path);

    // For 404, render in #app (full screen). For other pages, render in #view-container
    const targetId = !matched ? "app" : "view-container";
    const container = document.getElementById(targetId);
    if (!container) return;

    container.innerHTML = "";

    try {
        const viewElement = matched
            ? await matched.handler(matched.params)
            : NotFoundPage();
        container.appendChild(viewElement);
        updateNavbarActiveState();
    } catch (error) {
        console.error('Error loading page:', error);
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