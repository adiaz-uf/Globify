import { SpotifyEndpoints } from "@/api/endpoints.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";
import { logout } from "@/api/spotifyAuth.js";

// Default placeholder image
const defaultImage = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23535353"><circle cx="12" cy="12" r="10"/></svg>';

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

    // Fetch all data from Spotify API
    let userData: any = null;
    let listData: any = null;
    let topArtistsData: any = null;
    let topTracksData: any = null;
    let followingData: any = null;

    try {
        const [userRes, playlistsRes, artistsRes, tracksRes, followingRes] = await Promise.all([
            spotifyApiCall<any>(SpotifyEndpoints.currentUser, 'GET'),
            spotifyApiCall<any>(SpotifyEndpoints.myPlaylists, 'GET'),
            spotifyApiCall<any>(SpotifyEndpoints.topArtists(6, 'short_term'), 'GET'),
            spotifyApiCall<any>(SpotifyEndpoints.topTracks(6, 'short_term'), 'GET'),
            spotifyApiCall<any>(SpotifyEndpoints.followingArtists(6), 'GET')
        ]);
        userData = userRes;
        listData = playlistsRes;
        topArtistsData = artistsRes;
        topTracksData = tracksRes;
        followingData = followingRes;
        console.log('Profile data loaded:', { userData, listData, topArtistsData, topTracksData, followingData });
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }

    // Update avatar if user has an image
    if (userData?.images?.[0]?.url) {
        avatar.innerHTML = `<img src="${userData.images[0].url}" alt="${userData.display_name}" />`;
    }

    const profileName = document.createElement('h1');
    profileName.classList.add('profile-name');
    profileName.textContent = userData?.display_name || 'Usuario de Globify';
    profileInfo.appendChild(profileName);

    // Stats row
    const statsRow = document.createElement('div');
    statsRow.classList.add('profile-stats');

    const playlistCount = listData?.items?.length || 0;
    const followerCount = userData?.followers?.total || 0;

    const stats = [
        { value: playlistCount, label: 'Playlists públicas' },
        ...(followerCount > 0 ? [{ value: followerCount, label: 'seguidores' }] : [])
    ];

    stats.forEach((stat) => {
        const statItem = document.createElement('span');
        statItem.classList.add('stat-item');
        statItem.innerHTML = `<strong>${stat.value}</strong> ${stat.label}`;
        statsRow.appendChild(statItem);
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
    const topArtists = topArtistsData?.items || [];
    const topArtistsSection = createSection(
        'Artistas más escuchados este mes',
        topArtists.map((artist: any) => ({
            name: artist.name,
            type: 'Artista',
            image: artist.images?.[0]?.url || defaultImage
        })),
        true
    );
    container.appendChild(topArtistsSection);

    // ===== TOP TRACKS SECTION =====
    const topTracks = topTracksData?.items || [];
    const topTracksSection = createSection(
        'Canciones más escuchadas este mes',
        topTracks.map((track: any) => ({
            name: track.name,
            type: track.artists?.map((a: any) => a.name).join(', ') || '',
            image: track.album?.images?.[0]?.url || defaultImage
        })),
        false
    );
    container.appendChild(topTracksSection);

    // ===== PUBLIC PLAYLISTS SECTION =====
    const playlists = listData?.items || [];
    const playlistsSection = createSection(
        'Playlists públicas',
        playlists.slice(0, 6).map((playlist: any) => ({
            name: playlist.name,
            type: `${playlist.tracks?.total || 0} canciones`,
            image: playlist.images?.[0]?.url || defaultImage
        })),
        false
    );
    container.appendChild(playlistsSection);

    // ===== FOLLOWING SECTION =====
    const followedArtists = followingData?.artists?.items || [];
    const followingSection = createSection(
        'Siguiendo',
        followedArtists.map((artist: any) => ({
            name: artist.name,
            type: 'Artista',
            image: artist.images?.[0]?.url || defaultImage
        })),
        true
    );
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

    // Carousel wrapper (for floating arrows)
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-wrapper');

    // Left floating arrow
    const leftArrow = document.createElement('button');
    leftArrow.classList.add('carousel-arrow', 'carousel-arrow-left');
    leftArrow.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
        </svg>
    `;

    // Right floating arrow
    const rightArrow = document.createElement('button');
    rightArrow.classList.add('carousel-arrow', 'carousel-arrow-right');
    rightArrow.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
        </svg>
    `;

    // Items Grid (carousel)
    const grid = document.createElement('div');
    grid.classList.add('profile-items-grid');

    // Scroll handlers
    const scrollAmount = 200;
    leftArrow.addEventListener('click', () => {
        grid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    // Update arrow visibility based on scroll position
    // Update arrow visibility based on scroll position and content width
    const updateArrows = () => {
        const isScrollable = grid.scrollWidth > grid.clientWidth;

        // Hide both if not scrollable
        if (!isScrollable) {
            leftArrow.classList.add('hidden');
            rightArrow.classList.add('hidden');
            return;
        }

        leftArrow.classList.toggle('hidden', grid.scrollLeft <= 0);
        rightArrow.classList.toggle('hidden', Math.ceil(grid.scrollLeft + grid.clientWidth) >= grid.scrollWidth);
    };

    grid.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);

    setTimeout(updateArrows, 50);
    setTimeout(updateArrows, 500);
    setTimeout(updateArrows, 2000);

    carouselWrapper.appendChild(leftArrow);
    carouselWrapper.appendChild(grid);
    carouselWrapper.appendChild(rightArrow);

    items.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('profile-item-card');

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('item-image', isCircular ? 'circular' : 'square');
        imageContainer.innerHTML = `<img src="${item.image}" alt="${item.name}" class="item-cover-img" />`;

        // Play button overlay
        const playBtn = document.createElement('button');
        playBtn.classList.add('item-play-btn');
        playBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
        `;
        card.appendChild(imageContainer);
        card.appendChild(playBtn);

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

    section.appendChild(carouselWrapper);
    return section;
}