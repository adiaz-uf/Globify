import { navigateTo, render } from "@/utils/router.js";
import { redirectToSpotifyLogin, handleLoginCallback, isAuthenticated } from './api/spotifyAuth.js';


async function initApp() {
    // 1. Handle Spotify OAuth callback (if ?code= in URL)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('code')) {
        await handleLoginCallback();
        window.history.replaceState({}, document.title, "/");
    }

    // 2. Setup SPA link interception
    document.body.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest("a");
        if (link && link.getAttribute("href")?.startsWith("/")) {
            e.preventDefault();
            navigateTo(link.getAttribute("href")!);
        }
    });

    // 3. Handle browser back/forward
    window.addEventListener("popstate", render);

    // 4. Check authentication and render
    // TODO: Uncomment auth check when ready
    /*
    if (!isAuthenticated()) {
        // Show login in view-container
        const viewContainer = document.getElementById("view-container");
        if (viewContainer) {
            const loginButton = document.createElement('button');
            loginButton.innerText = "Login to Globify with Spotify";
            loginButton.className = "login-button";
            loginButton.onclick = redirectToSpotifyLogin;
            viewContainer.appendChild(loginButton);
        }
    } else {
        // User is authenticated - render the router
        console.log("✅ User authenticated. Rendering app...");
        render();
    }
    */

    // Temporary: always render without auth
    render();
}

document.addEventListener('DOMContentLoaded', initApp);