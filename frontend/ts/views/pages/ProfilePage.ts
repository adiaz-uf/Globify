import { SpotifyEndpoints } from "@/api/endpoints.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";
import { logout } from "@/api/spotifyAuth.js";

export const ProfilePage = async () => {
    const container = document.createElement('div');
    container.classList.add('profile-page');

    // ===== PROFILE HEADER =====
    const header = document.createElement('div');
    header.classList.add('profile-header');

    const headerGradient = document.createElement('div');
    headerGradient.classList.add('profile-header-gradient');
    header.appendChild(headerGradient);

    const headerContent = document.createElement('div');
    headerContent.classList.add('profile-header-content');

    // Profile Avatar
    const avatarContainer = document.createElement('div');
    avatarContainer.classList.add('profile-avatar-container');

    const avatar = document.createElement('div');
    avatar.classList.add('profile-avatar');
    avatar.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z"/>
        </svg>
    `;
    avatarContainer.appendChild(avatar);

    // Edit Avatar Button (hover overlay)
    const editAvatarBtn = document.createElement('button');
    editAvatarBtn.classList.add('edit-avatar-btn');
    editAvatarBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
        <span>Elegir foto</span>
    `;
    avatarContainer.appendChild(editAvatarBtn);
    headerContent.appendChild(avatarContainer);

    // Profile Info
    const profileInfo = document.createElement('div');
    profileInfo.classList.add('profile-info');

    const profileType = document.createElement('span');
    profileType.classList.add('profile-type');
    profileType.textContent = 'Perfil';
    profileInfo.appendChild(profileType);

    // Fetch user data from Spotify API with error handling
    let userData: any = null;
    try {
        userData = await spotifyApiCall<any>(SpotifyEndpoints.currentUser, 'GET');
        console.log('User data:', userData);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Continue rendering with fallback data
    }

    const profileName = document.createElement('h1');
    profileName.classList.add('profile-name');
    profileName.textContent = userData?.display_name || 'Usuario de Globify';
    profileInfo.appendChild(profileName);

    // Stats row
    const statsRow = document.createElement('div');
    statsRow.classList.add('profile-stats');

    const stats = [
        { value: '12', label: 'Playlists públicas' },
        { value: '234', label: 'Seguidores' },
        { value: '156', label: 'Siguiendo' }
    ];

    stats.forEach((stat, index) => {
        const statItem = document.createElement('span');
        statItem.classList.add('stat-item');
        statItem.innerHTML = `<strong>${stat.value}</strong> ${stat.label}`;
        statsRow.appendChild(statItem);

        if (index < stats.length - 1) {
            const dot = document.createElement('span');
            dot.classList.add('stat-separator');
            dot.textContent = '•';
            statsRow.appendChild(dot);
        }
    });

    profileInfo.appendChild(statsRow);
    headerContent.appendChild(profileInfo);
    header.appendChild(headerContent);
    container.appendChild(header);

    // ===== ACTION BUTTONS =====
    const actionsSection = document.createElement('div');
    actionsSection.classList.add('profile-actions');

    const moreBtn = document.createElement('button');
    moreBtn.classList.add('profile-action-btn', 'more-btn');
    moreBtn.setAttribute('aria-label', 'Más opciones');
    moreBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="19" cy="12" r="2"/>
        </svg>
    `;
    actionsSection.appendChild(moreBtn);

    // Logout button
    const logoutBtn = document.createElement('button');
    logoutBtn.classList.add('logout-btn');
    logoutBtn.textContent = 'Cerrar sesión';
    logoutBtn.addEventListener('click', () => {
        logout();
    });
    actionsSection.appendChild(logoutBtn);

    container.appendChild(actionsSection);

    // ===== TOP ARTISTS SECTION =====
    const topArtistsSection = createSection('Artistas más escuchados este mes', [
        { name: 'Bad Bunny', type: 'Artista', image: '🎤' },
        { name: 'Taylor Swift', type: 'Artista', image: '🎵' },
        { name: 'The Weeknd', type: 'Artista', image: '🎶' },
        { name: 'Drake', type: 'Artista', image: '🎧' },
        { name: 'Dua Lipa', type: 'Artista', image: '💿' },
        { name: 'Peso Pluma', type: 'Artista', image: '🎸' }
    ], true);
    container.appendChild(topArtistsSection);

    // ===== TOP TRACKS SECTION =====
    const topTracksSection = createSection('Canciones más escuchadas este mes', [
        { name: 'Blinding Lights', type: 'The Weeknd', image: '🔥' },
        { name: 'As It Was', type: 'Harry Styles', image: '✨' },
        { name: 'Anti-Hero', type: 'Taylor Swift', image: '💫' },
        { name: 'Flowers', type: 'Miley Cyrus', image: '🌸' },
        { name: 'Calm Down', type: 'Rema, Selena Gomez', image: '🎵' },
        { name: 'Ella Baila Sola', type: 'Eslabon Armado', image: '💃' }
    ], false);
    container.appendChild(topTracksSection);

    // ===== PUBLIC PLAYLISTS SECTION =====
    const playlistsSection = createSection('Playlists públicas', [
        { name: 'Mis Favoritas 2024', type: '45 canciones', image: '❤️' },
        { name: 'Workout Mix', type: '32 canciones', image: '💪' },
        { name: 'Chill Vibes', type: '28 canciones', image: '🌊' },
        { name: 'Road Trip', type: '56 canciones', image: '🚗' }
    ], false);
    container.appendChild(playlistsSection);

    // ===== FOLLOWING SECTION =====
    const followingSection = createSection('Siguiendo', [
        { name: 'Spotify', type: 'Perfil', image: '🎧' },
        { name: 'Manu', type: 'Perfil', image: '👤' },
        { name: 'Laura', type: 'Perfil', image: '👤' },
        { name: 'Carlos', type: 'Perfil', image: '👤' }
    ], true);
    container.appendChild(followingSection);

    return container;
};

// Helper function to create content sections
function createSection(title: string, items: { name: string; type: string; image: string }[], isCircular: boolean) {
    const section = document.createElement('section');
    section.classList.add('profile-section');

    // Section Header
    const sectionHeader = document.createElement('div');
    sectionHeader.classList.add('section-header');

    const sectionTitle = document.createElement('h2');
    sectionTitle.classList.add('section-title');
    sectionTitle.textContent = title;
    sectionHeader.appendChild(sectionTitle);

    const showAllBtn = document.createElement('button');
    showAllBtn.classList.add('show-all-btn');
    showAllBtn.textContent = 'Mostrar todo';
    sectionHeader.appendChild(showAllBtn);

    section.appendChild(sectionHeader);

    // Items Grid
    const grid = document.createElement('div');
    grid.classList.add('profile-items-grid');

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('profile-item-card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('item-image', isCircular ? 'circular' : 'square');
        imageContainer.innerHTML = `<span class="item-emoji">${item.image}</span>`;

        // Play button overlay
        const playBtn = document.createElement('button');
        playBtn.classList.add('item-play-btn');
        playBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        imageContainer.appendChild(playBtn);
        card.appendChild(imageContainer);

        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');

        const itemName = document.createElement('p');
        itemName.classList.add('item-name');
        itemName.textContent = item.name;
        itemInfo.appendChild(itemName);

        const itemType = document.createElement('p');
        itemType.classList.add('item-type');
        itemType.textContent = item.type;
        itemInfo.appendChild(itemType);

        card.appendChild(itemInfo);
        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}