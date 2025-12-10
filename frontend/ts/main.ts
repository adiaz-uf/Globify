console.log('🎵 Globify loaded!');

import { redirectToSpotifyLogin, handleLoginCallback, isAuthenticated } from './api/spotifyAuth';

async function initApp() {
    // Manage spotify return (if there is ?code= in the url)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('code')) {
        await handleLoginCallback();
        window.history.replaceState({}, document.title, "/");
        // TODO: Reload or render the clean app
    }

    // 2. Are we authenticated?
    if (!isAuthenticated()) {
        // Render Login button
        const loginButton = document.createElement('button');
        loginButton.innerText = "Login to Globify with Spotify";
        loginButton.onclick = redirectToSpotifyLogin;
        document.body.appendChild(loginButton);
    } else {
        // Render the Main App
        console.log("User authenticated. Rendering Dashboard...");
        // Here you would call AppController to render the layout
        // AppController.render();
    }
}

document.addEventListener('DOMContentLoaded', initApp);
