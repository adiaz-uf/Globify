console.log('🎵 Globify loaded!');

import { redirectToSpotifyLogin, handleLoginCallback, isAuthenticated, logout } from './api/spotifyAuth.js';

async function initApp() {
    console.log('initApp called');

    // Handle Spotify callback (if ?code= is in the URL)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('code')) {
        console.log('Handling Spotify callback...');
        await handleLoginCallback();
        window.history.replaceState({}, document.title, "/");
    }

    // Check authentication status
    console.log('isAuthenticated:', isAuthenticated());

    if (!isAuthenticated()) {
        renderLoginView();
    } else {
        renderAuthenticatedApp();
    }
}

function renderLoginView() {
    console.log('Rendering login view...');

    // Get the app container
    const app = document.getElementById('app');
    if (!app) {
        console.error('App container not found!');
        return;
    }

    // Replace entire app content with login view
    app.innerHTML = `
        <div class="login-container" style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            gap: 24px;
            background: #000;
            position: fixed;
            top: 0;
            left: 0;
        ">
            <h1 style="color: #1ed760; font-size: 3rem;">🎵 Globify</h1>
            <p style="color: #a7a7a7;">Connect with Spotify to start listening</p>
            <button id="login-btn" style="
                background: #1ed760;
                color: #000;
                border: none;
                padding: 16px 48px;
                border-radius: 500px;
                font-size: 1rem;
                font-weight: bold;
                cursor: pointer;
                transition: transform 0.2s, background 0.2s;
            ">Login with Spotify</button>
        </div>
    `;

    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        console.log('Login button found, attaching event listener');
        loginBtn.addEventListener('click', () => {
            console.log('Login button clicked!');
            redirectToSpotifyLogin();
        });
        loginBtn.addEventListener('mouseenter', () => loginBtn.style.transform = 'scale(1.05)');
        loginBtn.addEventListener('mouseleave', () => loginBtn.style.transform = 'scale(1)');
    } else {
        console.error('Login button not found!');
    }
}

async function renderAuthenticatedApp() {
    console.log("User authenticated. Rendering app...");

    // Dynamically import router only when authenticated
    const { render, navigateTo } = await import('./utils/router.js');

    // Get original HTML structure back
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
        <nav id="sidebar" class="sidebar">
            <div class="logo">Globify</div>
            <ul>
                <li><a href="/" data-link>Home</a></li>
                <li><a href="/search" data-link>Search</a></li>
                <li><a href="/library" data-link>Your Library</a></li>
            </ul>
            <div id="playlists-list"></div>
            <button id="logout-btn" style="
                background: transparent;
                color: #a7a7a7;
                border: 1px solid #a7a7a7;
                padding: 8px 16px;
                border-radius: 500px;
                margin: 16px;
                cursor: pointer;
            ">Logout</button>
        </nav>

        <main class="main-content">
            <header class="top-bar">
                <div class="navigation-arrows">
                    <button>&lt;</button>
                    <button>&gt;</button>
                </div>
                <div id="user-profile-pill">User</div>
            </header>
            <div id="view-container"></div>
        </main>

        <footer id="player-bar" class="player-bar">
            <div class="now-playing"></div>
            <div class="player-controls">
                <button id="btn-prev">⏮</button>
                <button id="btn-play-pause">▶</button>
                <button id="btn-next">⏭</button>
            </div>
            <div class="volume-controls"></div>
        </footer>
    `;

    // Set up logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Set up navigation links
    document.querySelectorAll('[data-link]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = (e.target as HTMLAnchorElement).getAttribute('href');
            if (href) navigateTo(href);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', render);

    // Render current route
    render();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

