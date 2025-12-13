import { SpotifyEndpoints } from "@/api/endpoints.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";

// SVG Icons
const icons = {
    close: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06z"/></svg>`,
    heart: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M1.69 2A4.582 4.582 0 0 1 8 2.023 4.583 4.583 0 0 1 11.88.817h.002a4.618 4.618 0 0 1 3.782 3.65v.003a4.543 4.543 0 0 1-1.011 3.84L9.35 14.629a1.765 1.765 0 0 1-2.093.464 1.762 1.762 0 0 1-.605-.463L1.348 8.309A4.582 4.582 0 0 1 1.689 2zm3.158.252A3.082 3.082 0 0 0 2.49 7.337l.005.005L7.8 13.664a.264.264 0 0 0 .311.069.262.262 0 0 0 .09-.069l5.312-6.33a3.043 3.043 0 0 0 .68-2.573 3.118 3.118 0 0 0-2.551-2.463 3.079 3.079 0 0 0-2.612.816l-.007.007a1.501 1.501 0 0 1-2.045 0l-.009-.008a3.082 3.082 0 0 0-2.121-.861z"/></svg>`,
    heartFilled: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"/></svg>`,
    expand: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"/></svg>`,
};

// Default placeholder cover
const defaultCover = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect fill='%23282828' width='80' height='80'/%3E%3Ccircle cx='40' cy='40' r='30' fill='%23181818'/%3E%3Ccircle cx='40' cy='40' r='8' fill='%23282828'/%3E%3Ccircle cx='40' cy='40' r='4' fill='%23181818'/%3E%3C/svg%3E";

// Default artist placeholder
const defaultArtistImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect fill='%23282828' width='80' height='80'/%3E%3Ccircle cx='40' cy='35' r='15' fill='%23535353'/%3E%3Cellipse cx='40' cy='65' rx='25' ry='15' fill='%23535353'/%3E%3C/svg%3E";

// sidebar_right state
let sidebar_rightVisible = true;
let currentTrackData: any = null;
let currentArtistData: any = null;

// Format number with K, M suffix
const formatNumber = (num: number): string => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' K';
    }
    return num.toString();
};

// Toggle sidebar_right visibility
export const togglesidebar_right = (): void => {
    const sidebar_right = document.querySelector('.now-playing-sidebar_right');
    const collapsedToggle = document.querySelector('.sidebar_right-collapsed-toggle');

    console.log('togglesidebar_right called', { sidebar_right, collapsedToggle, sidebar_rightVisible });

    if (sidebar_right) {
        sidebar_rightVisible = !sidebar_rightVisible;
        sidebar_right.classList.toggle('collapsed', !sidebar_rightVisible);

        console.log('sidebar_right collapsed:', !sidebar_rightVisible);

        // Show/hide the collapsed toggle button
        if (collapsedToggle) {
            collapsedToggle.classList.toggle('visible', !sidebar_rightVisible);
            console.log('Toggle visible class:', !sidebar_rightVisible);
        }
    }
};

// Update sidebar_right with current track data
export const updatesidebar_right = async (trackData: any): Promise<void> => {
    if (!trackData) return;

    currentTrackData = trackData;

    // Update cover
    const coverEl = document.getElementById('sidebar_right-cover') as HTMLImageElement;
    const collapsedCoverEl = document.getElementById('sidebar_right-collapsed-cover') as HTMLImageElement;
    const coverUrl = trackData.album?.images?.[0]?.url || defaultCover;

    if (coverEl) {
        coverEl.src = coverUrl;
        coverEl.alt = `${trackData.name} - ${trackData.artists?.[0]?.name || 'Unknown'}`;
    }

    // Update collapsed cover
    if (collapsedCoverEl) {
        collapsedCoverEl.src = coverUrl;
    }

    // Update header title (album name)
    const headerTitleEl = document.getElementById('sidebar_right-header-title');
    if (headerTitleEl) {
        headerTitleEl.textContent = trackData.album?.name || 'Reproduciendo ahora';
    }

    // Update track name
    const trackNameEl = document.getElementById('sidebar_right-track-name');
    if (trackNameEl) {
        trackNameEl.textContent = trackData.name || 'Unknown Track';
    }

    // Update artist name
    const artistNameEl = document.getElementById('sidebar_right-artist-name');
    if (artistNameEl) {
        artistNameEl.textContent = trackData.artists?.map((a: any) => a.name).join(', ') || 'Unknown Artist';
    }

    // Update credits section
    const creditArtistEl = document.getElementById('sidebar_right-credit-artist');
    if (creditArtistEl) {
        creditArtistEl.textContent = trackData.artists?.[0]?.name || '';
    }

    const creditAlbumEl = document.getElementById('sidebar_right-credit-album');
    if (creditAlbumEl) {
        creditAlbumEl.textContent = trackData.album?.name || '';
    }

    // Fetch artist data for the artist section
    if (trackData.artists?.[0]?.id) {
        try {
            const artistData = await spotifyApiCall<any>(SpotifyEndpoints.getArtist(trackData.artists[0].id), 'GET');
            currentArtistData = artistData;
            updateArtistSection(artistData);
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    }
};

// Update artist section in sidebar_right
const updateArtistSection = (artistData: any): void => {
    // Update artist image
    const artistImgEl = document.getElementById('sidebar_right-artist-img') as HTMLImageElement;
    if (artistImgEl) {
        artistImgEl.src = artistData.images?.[0]?.url || defaultArtistImage;
        artistImgEl.alt = artistData.name;
    }

    // Update artist name in section
    const artistSectionNameEl = document.getElementById('sidebar_right-artist-section-name');
    if (artistSectionNameEl) {
        artistSectionNameEl.textContent = artistData.name;
    }

    // Update followers count
    const followersEl = document.getElementById('sidebar_right-artist-followers');
    if (followersEl) {
        followersEl.textContent = `${formatNumber(artistData.followers?.total || 0)} seguidores`;
    }
};

// Create sidebar_right component
export const Sidebar_right = async (): Promise<HTMLElement> => {
    const sidebar_right = document.createElement("aside");
    sidebar_right.className = "now-playing-sidebar_right";

    // Fetch current player state
    let trackData: any = null;
    let artistData: any = null;

    try {
        const playerState = await spotifyApiCall<any>(SpotifyEndpoints.playerState, 'GET');
        trackData = playerState?.item;
        currentTrackData = trackData;

        // Fetch artist data
        if (trackData?.artists?.[0]?.id) {
            artistData = await spotifyApiCall<any>(SpotifyEndpoints.getArtist(trackData.artists[0].id), 'GET');
            currentArtistData = artistData;
        }
    } catch (error) {
        console.error('Error fetching sidebar_right data:', error);
    }

    // ========== HEADER ==========
    const header = document.createElement("div");
    header.className = "sidebar_right-header";

    const title = document.createElement("span");
    title.id = "sidebar_right-header-title";
    title.className = "sidebar_right-title";
    title.textContent = trackData?.album?.name || "Reproduciendo ahora";

    const closeBtn = document.createElement("button");
    closeBtn.className = "sidebar_right-close";
    closeBtn.innerHTML = icons.close;
    closeBtn.title = "Cerrar";
    closeBtn.addEventListener("click", togglesidebar_right);

    header.appendChild(title);
    header.appendChild(closeBtn);

    // ========== CONTENT ==========
    const content = document.createElement("div");
    content.className = "sidebar_right-content";

    // Album cover
    const coverContainer = document.createElement("div");
    coverContainer.className = "sidebar_right-cover-container";

    const cover = document.createElement("img");
    cover.id = "sidebar_right-cover";
    cover.className = "sidebar_right-cover";
    cover.src = trackData?.album?.images?.[0]?.url || defaultCover;
    cover.alt = trackData ? `${trackData.name} - ${trackData.artists?.[0]?.name}` : "No track playing";

    coverContainer.appendChild(cover);
    content.appendChild(coverContainer);

    // Track info section
    const trackInfo = document.createElement("div");
    trackInfo.className = "sidebar_right-track-info";

    const trackHeader = document.createElement("div");
    trackHeader.className = "sidebar_right-track-header";

    const trackDetails = document.createElement("div");
    trackDetails.className = "sidebar_right-track-details";

    const trackName = document.createElement("h2");
    trackName.id = "sidebar_right-track-name";
    trackName.className = "sidebar_right-track-name";
    trackName.textContent = trackData?.name || "Elige una canción";

    const artistName = document.createElement("p");
    artistName.id = "sidebar_right-artist-name";
    artistName.className = "sidebar_right-track-artist";
    artistName.textContent = trackData?.artists?.map((a: any) => a.name).join(', ') || "";

    trackDetails.appendChild(trackName);
    trackDetails.appendChild(artistName);

    // Like button
    const likeBtn = document.createElement("button");
    likeBtn.className = "sidebar_right-like-btn";
    likeBtn.innerHTML = icons.heart;
    likeBtn.title = "Guardar en tu biblioteca";
    likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("active");
        if (likeBtn.classList.contains("active")) {
            likeBtn.innerHTML = icons.heartFilled;
        } else {
            likeBtn.innerHTML = icons.heart;
        }
    });

    trackHeader.appendChild(trackDetails);
    trackHeader.appendChild(likeBtn);
    trackInfo.appendChild(trackHeader);
    content.appendChild(trackInfo);

    // ========== ABOUT THE ARTIST SECTION ==========
    if (artistData || trackData?.artists?.[0]) {
        const artistSection = document.createElement("div");
        artistSection.className = "sidebar_right-section";

        const artistSectionHeader = document.createElement("div");
        artistSectionHeader.className = "sidebar_right-section-header";

        const artistSectionTitle = document.createElement("h3");
        artistSectionTitle.className = "sidebar_right-section-title";
        artistSectionTitle.textContent = "Acerca del artista";

        artistSectionHeader.appendChild(artistSectionTitle);
        artistSection.appendChild(artistSectionHeader);

        // Artist card
        const artistCard = document.createElement("div");
        artistCard.className = "sidebar_right-artist-card";

        const artistImg = document.createElement("img");
        artistImg.id = "sidebar_right-artist-img";
        artistImg.className = "sidebar_right-artist-image";
        artistImg.src = artistData?.images?.[0]?.url || defaultArtistImage;
        artistImg.alt = artistData?.name || trackData?.artists?.[0]?.name || "";

        const artistInfo = document.createElement("div");
        artistInfo.className = "sidebar_right-artist-info";

        const artistSectionName = document.createElement("p");
        artistSectionName.id = "sidebar_right-artist-section-name";
        artistSectionName.className = "sidebar_right-artist-name";
        artistSectionName.textContent = artistData?.name || trackData?.artists?.[0]?.name || "";

        const followersCount = document.createElement("p");
        followersCount.id = "sidebar_right-artist-followers";
        followersCount.className = "sidebar_right-artist-followers";
        followersCount.textContent = artistData ? `${formatNumber(artistData.followers?.total || 0)} seguidores` : "";

        artistInfo.appendChild(artistSectionName);
        artistInfo.appendChild(followersCount);

        const followBtn = document.createElement("button");
        followBtn.className = "sidebar_right-follow-btn";
        followBtn.textContent = "Seguir";
        followBtn.addEventListener("click", () => {
            followBtn.classList.toggle("following");
            followBtn.textContent = followBtn.classList.contains("following") ? "Siguiendo" : "Seguir";
        });

        artistCard.appendChild(artistImg);
        artistCard.appendChild(artistInfo);
        artistCard.appendChild(followBtn);

        artistSection.appendChild(artistCard);
        content.appendChild(artistSection);
    }

    // ========== CREDITS SECTION ==========
    const creditsSection = document.createElement("div");
    creditsSection.className = "sidebar_right-section";

    const creditsSectionHeader = document.createElement("div");
    creditsSectionHeader.className = "sidebar_right-section-header";

    const creditsSectionTitle = document.createElement("h3");
    creditsSectionTitle.className = "sidebar_right-section-title";
    creditsSectionTitle.textContent = "Créditos";

    const creditsLink = document.createElement("span");
    creditsLink.className = "sidebar_right-section-link";
    creditsLink.textContent = "Mostrar todo";

    creditsSectionHeader.appendChild(creditsSectionTitle);
    creditsSectionHeader.appendChild(creditsLink);
    creditsSection.appendChild(creditsSectionHeader);

    // Add credits items
    const creditsContainer = document.createElement("div");
    creditsContainer.className = "sidebar_right-credits";

    // Main artist credit
    const artistCredit = document.createElement("div");
    artistCredit.className = "sidebar_right-credit-item";

    const artistRole = document.createElement("span");
    artistRole.className = "sidebar_right-credit-role";
    artistRole.textContent = "Artista principal";

    const artistCreditName = document.createElement("span");
    artistCreditName.id = "sidebar_right-credit-artist";
    artistCreditName.className = "sidebar_right-credit-name";
    artistCreditName.textContent = trackData?.artists?.[0]?.name || '';

    artistCredit.appendChild(artistRole);
    artistCredit.appendChild(artistCreditName);
    creditsContainer.appendChild(artistCredit);

    // Album credit
    const albumCredit = document.createElement("div");
    albumCredit.className = "sidebar_right-credit-item";

    const albumRole = document.createElement("span");
    albumRole.className = "sidebar_right-credit-role";
    albumRole.textContent = "Álbum";

    const albumCreditName = document.createElement("span");
    albumCreditName.id = "sidebar_right-credit-album";
    albumCreditName.className = "sidebar_right-credit-name";
    albumCreditName.textContent = trackData?.album?.name || '';

    albumCredit.appendChild(albumRole);
    albumCredit.appendChild(albumCreditName);
    creditsContainer.appendChild(albumCredit);

    creditsSection.appendChild(creditsContainer);
    content.appendChild(creditsSection);

    // Assemble sidebar_right
    sidebar_right.appendChild(header);
    sidebar_right.appendChild(content);

    // ========== COLLAPSED TOGGLE BUTTON ==========
    // This shows when sidebar_right is collapsed to allow reopening
    const collapsedToggle = document.createElement("div");
    collapsedToggle.className = "sidebar_right-collapsed-toggle";

    // Mini cover preview
    const collapsedCover = document.createElement("img");
    collapsedCover.id = "sidebar_right-collapsed-cover";
    collapsedCover.className = "sidebar_right-collapsed-cover";
    collapsedCover.src = trackData?.album?.images?.[0]?.url || defaultCover;
    collapsedCover.alt = "Expandir panel";
    collapsedCover.addEventListener("click", togglesidebar_right);

    const expandBtn = document.createElement("button");
    expandBtn.className = "sidebar_right-toggle-btn";
    expandBtn.innerHTML = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M11.03 3.47a.75.75 0 0 1 0 1.06L8.56 7H14.5a.75.75 0 0 1 0 1.5H8.56l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0z"/></svg>`;
    expandBtn.title = "Mostrar panel de reproducción";
    expandBtn.addEventListener("click", togglesidebar_right);

    collapsedToggle.appendChild(collapsedCover);
    collapsedToggle.appendChild(expandBtn);

    // Create wrapper to hold both sidebar_right and collapsed toggle
    const wrapper = document.createDocumentFragment();
    wrapper.appendChild(sidebar_right);
    wrapper.appendChild(collapsedToggle);

    // Return the wrapper as a container div
    const container = document.createElement("div");
    container.className = "sidebar_right-wrapper";
    container.appendChild(sidebar_right);
    container.appendChild(collapsedToggle);

    return container;
};

// Export for external use
export const issidebar_rightVisible = (): boolean => sidebar_rightVisible;
export const setsidebar_rightVisible = (visible: boolean): void => {
    sidebar_rightVisible = visible;
    const sidebar_right = document.querySelector('.now-playing-sidebar_right');
    const collapsedToggle = document.querySelector('.sidebar_right-collapsed-toggle');

    if (sidebar_right) {
        sidebar_right.classList.toggle('collapsed', !visible);
    }
    if (collapsedToggle) {
        collapsedToggle.classList.toggle('visible', !visible);
    }
};
