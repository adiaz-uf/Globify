import { navigateTo } from "../../utils/router.js";
import { spotifyApiCall } from "../../api/spotifyClient.js";
import { SpotifyEndpoints } from "../../api/endpoints.js";

interface NavItem {
    label: string;
    href: string;
    icon: string;
    iconActive?: string; // Icon to use when active
}

// Spotify logo SVG
const spotifyLogo = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`;

// SVG icons
const icons = {
    home: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z"/></svg>`,
    homeFilled: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z"/></svg>`,
    search: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"/></svg>`,
    searchFilled: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.356 10.558c0 2.623-2.16 4.75-4.823 4.75-2.664 0-4.824-2.127-4.824-4.75s2.16-4.75 4.824-4.75c2.664 0 4.823 2.127 4.823 4.75zm1.517 3.67a7.672 7.672 0 0 0 1.66-4.748c0-4.257-3.507-7.708-7.83-7.708-4.324 0-7.831 3.451-7.831 7.708s3.507 7.708 7.83 7.708c1.792 0 3.442-.59 4.773-1.584l4.687 4.617a1.5 1.5 0 0 0 2.106-2.136l-4.678-4.608a1.506 1.506 0 0 0-.717.75z"/></svg>`,
    library: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"/></svg>`,
    libraryFilled: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 1 1 2 0v18a1 1 0 0 1-1 1zm5.5-19.866a1 1 0 0 0-1.5.866v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464z"/></svg>`,
    profile: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"/></svg>`,
    profileFilled: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 14c5.523 0 10 2.239 10 5v1H2v-1c0-2.761 4.477-5 10-5z"/></svg>`,
};

// Home nav item only
const homeNavItem: NavItem = { label: "", href: "/", icon: icons.home, iconActive: icons.homeFilled };

// Cache for user data
let cachedUserData: { displayName: string; imageUrl: string | null } | null = null;

// Function to fetch and cache user data
async function fetchUserData(): Promise<{ displayName: string; imageUrl: string | null }> {
    if (cachedUserData) {
        return cachedUserData;
    }

    try {
        const userData = await spotifyApiCall<any>(SpotifyEndpoints.currentUser, 'GET');
        cachedUserData = {
            displayName: userData.display_name || 'Usuario',
            imageUrl: userData.images?.[0]?.url || null
        };
        return cachedUserData;
    } catch (error) {
        console.error('Error fetching user data for navbar:', error);
        return { displayName: 'Usuario', imageUrl: null };
    }
}

// Create profile avatar element
function createProfileAvatar(displayName: string, imageUrl: string | null): HTMLElement {
    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'nav-profile-avatar';
    avatarContainer.id = 'nav-profile-avatar';

    if (imageUrl) {
        // Use profile image if available
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = displayName;
        img.className = 'nav-avatar-img';
        avatarContainer.appendChild(img);
    } else {
        // Use first letter of display name
        const initial = displayName.charAt(0).toUpperCase();
        avatarContainer.textContent = initial;
    }

    return avatarContainer;
}

const createNavLink = (item: NavItem): HTMLElement => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = item.href;
    a.setAttribute("data-link", "");

    const isActive = window.location.pathname === item.href;
    const iconSpan = document.createElement("span");
    iconSpan.className = "nav-icon";
    // Use filled icon if active and iconActive exists
    iconSpan.innerHTML = isActive && item.iconActive ? item.iconActive : item.icon;
    a.appendChild(iconSpan);

    if (item.label) {
        const labelSpan = document.createElement("span");
        labelSpan.className = "nav-label";
        labelSpan.textContent = item.label;
        a.appendChild(labelSpan);
    }

    a.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(item.href);
    });

    if (isActive) {
        a.classList.add("active");
    }

    li.appendChild(a);
    return li;
};

// Search input change callback (can be used by other modules)
let searchCallback: ((query: string) => void) | null = null;

export const onSearch = (callback: (query: string) => void): void => {
    searchCallback = callback;
};

export const getSearchValue = (): string => {
    const input = document.getElementById("nav-search-input") as HTMLInputElement;
    return input?.value || "";
};

export const Navbar = (): HTMLElement => {
    const nav = document.createElement("nav");
    nav.id = "global-nav-bar";
    nav.className = "global-nav-bar";

    // Left section - Logo
    const leftSection = document.createElement("div");
    leftSection.className = "nav-section nav-left";

    const logo = document.createElement("a");
    logo.className = "logo";
    logo.href = "/";
    logo.innerHTML = spotifyLogo;
    logo.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo("/");
    });
    leftSection.appendChild(logo);
    nav.appendChild(leftSection);

    // Center section - Home button + Search input
    const centerSection = document.createElement("div");
    centerSection.className = "nav-section nav-center";

    // Home button
    const homeUl = document.createElement("ul");
    homeUl.appendChild(createNavLink(homeNavItem));
    centerSection.appendChild(homeUl);

    // Search input container
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";

    // Search button (left side)
    const searchButton = document.createElement("button");
    searchButton.type = "button";
    searchButton.className = "search-button";
    searchButton.innerHTML = icons.search;
    searchButton.setAttribute("aria-label", "Buscar");

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "nav-search-input";
    searchInput.className = "search-input";
    searchInput.placeholder = "¿Qué quieres escuchar?";
    searchInput.autocomplete = "off";
    searchInput.setAttribute("autocapitalize", "off");
    searchInput.setAttribute("autocorrect", "off");
    searchInput.setAttribute("spellcheck", "false");

    // Search dropdown for live results
    const searchDropdown = document.createElement("div");
    searchDropdown.className = "search-dropdown";
    searchDropdown.id = "search-dropdown";

    // Debounce timer
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    // Function to perform search
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            hideSearchDropdown();
            navigateTo(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    // Function to show dropdown
    const showSearchDropdown = () => {
        searchDropdown.classList.add('active');
    };

    // Function to hide dropdown
    const hideSearchDropdown = () => {
        searchDropdown.classList.remove('active');
    };

    // Function to render dropdown results
    const renderDropdownResults = (results: any) => {
        searchDropdown.innerHTML = '';

        const hasResults = results.tracks?.items?.length ||
            results.artists?.items?.length ||
            results.albums?.items?.length;

        if (!hasResults) {
            const noResults = document.createElement('div');
            noResults.className = 'search-dropdown-section';
            noResults.innerHTML = '<span class="search-dropdown-item-subtitle">No se encontraron resultados</span>';
            searchDropdown.appendChild(noResults);
            showSearchDropdown();
            return;
        }

        const defaultCover = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect fill='%23282828' width='80' height='80'/%3E%3Ccircle cx='40' cy='40' r='20' fill='%23535353'/%3E%3C/svg%3E";

        // Tracks section
        if (results.tracks?.items?.length) {
            const section = document.createElement('div');
            section.className = 'search-dropdown-section';

            const title = document.createElement('div');
            title.className = 'search-dropdown-section-title';
            title.textContent = 'Canciones';
            section.appendChild(title);

            results.tracks.items.slice(0, 3).forEach((track: any) => {
                const item = document.createElement('div');
                item.className = 'search-dropdown-item';

                const img = document.createElement('img');
                img.className = 'search-dropdown-item-image';
                img.src = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url || defaultCover;
                img.alt = track.name;
                item.appendChild(img);

                const info = document.createElement('div');
                info.className = 'search-dropdown-item-info';

                const name = document.createElement('span');
                name.className = 'search-dropdown-item-name';
                name.textContent = track.name;
                info.appendChild(name);

                const subtitle = document.createElement('span');
                subtitle.className = 'search-dropdown-item-subtitle';
                subtitle.textContent = `Canción • ${track.artists?.map((a: any) => a.name).join(', ')}`;
                info.appendChild(subtitle);

                item.appendChild(info);

                item.addEventListener('click', () => {
                    hideSearchDropdown();
                    // Could play track or navigate to album
                    console.log('Selected track:', track.id);
                });

                section.appendChild(item);
            });

            searchDropdown.appendChild(section);
        }

        // Artists section
        if (results.artists?.items?.length) {
            const section = document.createElement('div');
            section.className = 'search-dropdown-section';

            const title = document.createElement('div');
            title.className = 'search-dropdown-section-title';
            title.textContent = 'Artistas';
            section.appendChild(title);

            results.artists.items.slice(0, 2).forEach((artist: any) => {
                const item = document.createElement('div');
                item.className = 'search-dropdown-item';

                const img = document.createElement('img');
                img.className = 'search-dropdown-item-image round';
                img.src = artist.images?.[2]?.url || artist.images?.[0]?.url || defaultCover;
                img.alt = artist.name;
                item.appendChild(img);

                const info = document.createElement('div');
                info.className = 'search-dropdown-item-info';

                const name = document.createElement('span');
                name.className = 'search-dropdown-item-name';
                name.textContent = artist.name;
                info.appendChild(name);

                const subtitle = document.createElement('span');
                subtitle.className = 'search-dropdown-item-subtitle';
                subtitle.textContent = 'Artista';
                info.appendChild(subtitle);

                item.appendChild(info);

                item.addEventListener('click', () => {
                    hideSearchDropdown();
                    console.log('Selected artist:', artist.id);
                });

                section.appendChild(item);
            });

            searchDropdown.appendChild(section);
        }

        // View all results link
        const footer = document.createElement('div');
        footer.className = 'search-dropdown-footer';

        const viewAll = document.createElement('span');
        viewAll.className = 'search-dropdown-view-all';
        viewAll.textContent = 'Ver todos los resultados';
        viewAll.addEventListener('click', performSearch);
        footer.appendChild(viewAll);

        searchDropdown.appendChild(footer);
        showSearchDropdown();
    };

    // Live search function
    const liveSearch = async (query: string) => {
        if (!query.trim()) {
            hideSearchDropdown();
            return;
        }

        try {
            const searchUrl = `${SpotifyEndpoints.search}?q=${encodeURIComponent(query)}&type=track,artist&limit=5`;
            const results = await spotifyApiCall<any>(searchUrl, 'GET');
            renderDropdownResults(results);
        } catch (error) {
            console.error('Live search error:', error);
            hideSearchDropdown();
        }
    };

    // Handle search input with debounce
    searchInput.addEventListener("input", (e) => {
        const query = (e.target as HTMLInputElement).value;

        // Clear previous timer
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Set new timer (300ms debounce)
        debounceTimer = setTimeout(() => {
            liveSearch(query);
        }, 300);

        // Also call external callback if set
        if (searchCallback) {
            searchCallback(query);
        }
    });

    // Handle Enter key
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }
            performSearch();
        } else if (e.key === "Escape") {
            hideSearchDropdown();
        }
    });

    // Handle search button click
    searchButton.addEventListener("click", performSearch);

    // Handle focus/blur for dropdown
    searchInput.addEventListener("focus", () => {
        const query = searchInput.value.trim();
        if (query && searchDropdown.children.length > 0) {
            showSearchDropdown();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target as Node)) {
            hideSearchDropdown();
        }
    });

    searchContainer.appendChild(searchButton);
    searchContainer.appendChild(searchInput);
    searchContainer.appendChild(searchDropdown);
    centerSection.appendChild(searchContainer);

    nav.appendChild(centerSection);

    // Right section - Profile Avatar
    const rightSection = document.createElement("div");
    rightSection.className = "nav-section nav-right";

    // Create profile link with avatar
    const profileLink = document.createElement("a");
    profileLink.href = "/profile";
    profileLink.className = "nav-profile-link";
    profileLink.setAttribute("data-link", "");

    // Initial placeholder avatar
    const placeholderAvatar = createProfileAvatar("?", null);
    profileLink.appendChild(placeholderAvatar);

    profileLink.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo("/profile");
    });

    rightSection.appendChild(profileLink);
    nav.appendChild(rightSection);

    // Fetch user data and update avatar asynchronously
    fetchUserData().then(userData => {
        const avatarContainer = profileLink.querySelector('.nav-profile-avatar');
        if (avatarContainer) {
            const newAvatar = createProfileAvatar(userData.displayName, userData.imageUrl);
            avatarContainer.replaceWith(newAvatar);
        }
    });

    return nav;
};

export const updateNavbarActiveState = (): void => {
    // Update home link active state
    const homeLink = document.querySelector("#global-nav-bar a[href='/']");
    const profileLink = document.querySelector("#global-nav-bar .nav-profile-link");

    if (homeLink) {
        const isHomeActive = window.location.pathname === "/";
        homeLink.classList.toggle("active", isHomeActive);

        const iconSpan = homeLink.querySelector(".nav-icon");
        if (iconSpan) {
            iconSpan.innerHTML = isHomeActive ? icons.homeFilled : icons.home;
        }
    }

    if (profileLink) {
        const isProfileActive = window.location.pathname === "/profile";
        profileLink.classList.toggle("active", isProfileActive);
    }
};

// Function to clear user cache (useful when logging out)
export const clearUserCache = (): void => {
    cachedUserData = null;
};

// Mobile tab bar item interface
interface TabItem {
    label: string;
    href: string;
    icon: string;
    iconActive: string;
}

// Tab items for mobile tabbar
const tabItems: TabItem[] = [
    { label: "Inicio", href: "/", icon: icons.home, iconActive: icons.homeFilled },
    { label: "Buscar", href: "/search", icon: icons.search, iconActive: icons.searchFilled },
    { label: "Tu biblioteca", href: "/library", icon: icons.library, iconActive: icons.libraryFilled },
];

// Create a mobile tab item
const createTabItem = (item: TabItem): HTMLElement => {
    const tabLink = document.createElement("a");
    tabLink.href = item.href;
    tabLink.className = "mobile-tab-item";
    tabLink.setAttribute("data-link", "");

    const isActive = window.location.pathname === item.href ||
        (item.href === "/search" && window.location.pathname.startsWith("/search"));

    const iconSpan = document.createElement("span");
    iconSpan.className = "mobile-tab-icon";
    iconSpan.innerHTML = isActive ? item.iconActive : item.icon;
    tabLink.appendChild(iconSpan);

    const labelSpan = document.createElement("span");
    labelSpan.className = "mobile-tab-label";
    labelSpan.textContent = item.label;
    tabLink.appendChild(labelSpan);

    if (isActive) {
        tabLink.classList.add("active");
    }

    tabLink.addEventListener("click", (e) => {
        e.preventDefault();
        navigateTo(item.href);
    });

    return tabLink;
};

// Mobile Tabbar Component
export const MobileTabbar = (): HTMLElement => {
    const tabbar = document.createElement("nav");
    tabbar.id = "mobile-tabbar";
    tabbar.className = "mobile-tabbar";

    tabItems.forEach(item => {
        tabbar.appendChild(createTabItem(item));
    });

    return tabbar;
};

// Update mobile tabbar active state
export const updateMobileTabbarActiveState = (): void => {
    const tabbar = document.getElementById("mobile-tabbar");
    if (!tabbar) return;

    const tabLinks = tabbar.querySelectorAll(".mobile-tab-item");
    tabLinks.forEach(link => {
        const href = link.getAttribute("href");
        const isActive = window.location.pathname === href ||
            (href === "/search" && window.location.pathname.startsWith("/search"));

        link.classList.toggle("active", isActive);

        const iconSpan = link.querySelector(".mobile-tab-icon");
        if (iconSpan) {
            const tabItem = tabItems.find(item => item.href === href);
            if (tabItem) {
                iconSpan.innerHTML = isActive ? tabItem.iconActive : tabItem.icon;
            }
        }
    });
};
