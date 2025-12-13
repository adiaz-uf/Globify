import { navigateTo, render } from "@/utils/router.js";
import { redirectToSpotifyLogin, handleLoginCallback, isAuthenticated, logout } from './api/spotifyAuth.js';
import { Navbar, updateNavbarActiveState, MobileTabbar, updateMobileTabbarActiveState } from './views/components/Navbar.js';
import { Footer } from './views/components/Footer.js';
import { Sidebar_right } from './views/components/Sidebar_right.js';
import { Sidebar } from './views/components/Sidebar.js';

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
    const { render } = await import('./utils/router.js');

    // Insert Navbar component into container
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        navbarContainer.innerHTML = '';
        navbarContainer.appendChild(Navbar());
    }

    // Insert Sidebar component into container
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        sidebarContainer.innerHTML = '';
        sidebarContainer.appendChild(Sidebar());
    }

    // Insert Footer/Player component into container
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = '';
        footerContainer.appendChild(await Footer());
    }

    // Insert Mobile Tabbar component into container (for mobile view)
    const mobileTabbarContainer = document.getElementById('mobile-tabbar-container');
    if (mobileTabbarContainer) {
        mobileTabbarContainer.innerHTML = '';
        mobileTabbarContainer.appendChild(MobileTabbar());
    }

    // Insert sidebar_right component into container (Now Playing view)
    const sidebar_rightContainer = document.getElementById('sidebar_right-container');
    if (sidebar_rightContainer) {
        sidebar_rightContainer.innerHTML = '';
        sidebar_rightContainer.appendChild(await Sidebar_right());
    }

    // Handle browser back/forward buttons and update navbar active state
    window.addEventListener('popstate', () => {
        render();
        updateNavbarActiveState();
        updateMobileTabbarActiveState();
    });

    // Render current route
    render();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

