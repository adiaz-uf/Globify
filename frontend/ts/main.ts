import { navigateTo, render } from "@/utils/router.js";

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest("a");

        if (link && link.getAttribute("href")?.startsWith("/")) {
            e.preventDefault();
            navigateTo(link.getAttribute("href")!);
        }
    })
    window.addEventListener("popstate", () => {
        render();
    })
    render();
});