import { navigateTo } from "../../utils/router.js";

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
    profile: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM6 8a6 6 0 1 1 12 0A6 6 0 0 1 6 8zm2 10a3 3 0 0 0-3 3 1 1 0 1 1-2 0 5 5 0 0 1 5-5h8a5 5 0 0 1 5 5 1 1 0 1 1-2 0 3 3 0 0 0-3-3H8z"/></svg>`,
    profileFilled: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0 14c5.523 0 10 2.239 10 5v1H2v-1c0-2.761 4.477-5 10-5z"/></svg>`,
};

// Home nav item only
const homeNavItem: NavItem = { label: "", href: "/", icon: icons.home, iconActive: icons.homeFilled };

// Right navigation items (Profile)
const rightNavItems: NavItem[] = [
    { label: "", href: "/profile", icon: icons.profile, iconActive: icons.profileFilled },
];

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

    // Function to perform search
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            navigateTo(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    // Handle search input
    searchInput.addEventListener("input", (e) => {
        const query = (e.target as HTMLInputElement).value;
        if (searchCallback) {
            searchCallback(query);
        }
    });

    // Handle Enter key
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });

    // Handle search button click
    searchButton.addEventListener("click", performSearch);

    searchContainer.appendChild(searchButton);
    searchContainer.appendChild(searchInput);
    centerSection.appendChild(searchContainer);

    nav.appendChild(centerSection);

    // Right section - Profile
    const rightSection = document.createElement("div");
    rightSection.className = "nav-section nav-right";

    const rightUl = document.createElement("ul");
    rightNavItems.forEach(item => {
        rightUl.appendChild(createNavLink(item));
    });
    rightSection.appendChild(rightUl);
    nav.appendChild(rightSection);

    return nav;
};

export const updateNavbarActiveState = (): void => {
    const allNavItems = [homeNavItem, ...rightNavItems];

    const links = document.querySelectorAll("#global-nav-bar a[data-link]");
    links.forEach(link => {
        const href = link.getAttribute("href");
        const isActive = href === window.location.pathname;
        const navItem = allNavItems.find(item => item.href === href);

        link.classList.remove("active");

        if (isActive) {
            link.classList.add("active");
        }

        // Update icon if navItem has iconActive
        if (navItem) {
            const iconSpan = link.querySelector(".nav-icon");
            if (iconSpan) {
                iconSpan.innerHTML = isActive && navItem.iconActive ? navItem.iconActive : navItem.icon;
            }
        }
    });
};
