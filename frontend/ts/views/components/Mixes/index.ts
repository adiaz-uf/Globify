import { MixCard } from "@/views/components/Mixes/MixesCard.js";
import { MixesHeader } from "@/views/components/Mixes/MixesHeader.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";
import { SpotifyEndpoints } from "@/api/endpoints.js";

interface SpotifyPlaylist {
    id: string;
    name: string;
    images: { url: string }[];
}

interface SpotifyAlbum {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
}

interface PlaylistsResponse {
    items: SpotifyPlaylist[];
    total: number;
}

interface NewReleasesResponse {
    albums: {
        items: SpotifyAlbum[];
        total: number;
    };
}

// Color palette
const colors = [
    "#1ed760", "#e91e63", "#ff5722", "#ffc107", "#cddc39",
    "#00bcd4", "#9c27b0", "#f44336", "#2196f3", "#4caf50"
];

type ContentType = 'playlists' | 'newReleases';

export const Mixes = (subtitle: string, title: string, offset: number = 0, type: ContentType = 'playlists') => {
    const container = document.createElement("div");
    container.classList.add("mixes-section");

    container.appendChild(MixesHeader(subtitle, title));

    const carouselWrapper = document.createElement("div");
    carouselWrapper.classList.add("carousel-wrapper");

    const grid = document.createElement("div");
    grid.classList.add("mixes-grid");

    grid.innerHTML = '<p style="color: var(--text-subdued);">Cargando...</p>';

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("carousel-arrow", "carousel-arrow-prev");
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
    prevBtn.setAttribute("aria-label", "Anterior");

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("carousel-arrow", "carousel-arrow-next");
    nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
    nextBtn.setAttribute("aria-label", "Siguiente");

    const updateArrowVisibility = () => {
        const isAtStart = grid.scrollLeft <= 0;
        const isAtEnd = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 1;
        prevBtn.classList.toggle("hidden", isAtStart);
        nextBtn.classList.toggle("hidden", isAtEnd);
    };

    const scrollAmount = 400;
    prevBtn.addEventListener("click", () => grid.scrollBy({ left: -scrollAmount, behavior: "smooth" }));
    nextBtn.addEventListener("click", () => grid.scrollBy({ left: scrollAmount, behavior: "smooth" }));

    grid.addEventListener("scroll", updateArrowVisibility);

    // Load content based on type, then update arrows
    const loadContent = async () => {
        if (type === 'newReleases') {
            await loadNewReleases(grid, offset);
        } else {
            await loadPlaylists(grid, offset);
        }
        // Update arrows after content is loaded
        setTimeout(updateArrowVisibility, 50);
    };
    loadContent();

    carouselWrapper.appendChild(prevBtn);
    carouselWrapper.appendChild(grid);
    carouselWrapper.appendChild(nextBtn);

    container.appendChild(carouselWrapper);
    return container;
}

async function loadPlaylists(grid: HTMLElement, offset: number) {
    try {
        const data = await spotifyApiCall<PlaylistsResponse>(
            SpotifyEndpoints.getMyPlaylistsPaginated(offset, 8),
            'GET'
        );

        grid.innerHTML = '';

        if (data.items.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-subdued);">No hay más playlists</p>';
            return;
        }

        data.items.forEach((playlist, index) => {
            const mixData = {
                id: playlist.id,
                title: playlist.name,
                description: `Playlist`,
                image: playlist.images?.[0]?.url || 'https://placehold.co/300x300/333/white?text=No+Image',
                color: colors[(offset + index) % colors.length],
                isPlaylist: true
            };
            grid.appendChild(MixCard(mixData));
        });

    } catch (error) {
        console.error('Error fetching playlists:', error);
        grid.innerHTML = '<p style="color: var(--text-negative);">Error al cargar playlists</p>';
    }
}

async function loadNewReleases(grid: HTMLElement, offset: number) {
    try {
        const data = await spotifyApiCall<NewReleasesResponse>(
            SpotifyEndpoints.getNewReleasesPaginated(offset, 8),
            'GET'
        );

        grid.innerHTML = '';

        if (data.albums.items.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-subdued);">No hay más lanzamientos</p>';
            return;
        }

        data.albums.items.forEach((album, index) => {
            const artistNames = album.artists.map(a => a.name).join(', ');
            const mixData = {
                id: album.id,
                title: album.name,
                description: artistNames,
                image: album.images?.[0]?.url || 'https://placehold.co/300x300/333/white?text=No+Image',
                color: colors[(offset + index) % colors.length],
                isPlaylist: false
            };
            grid.appendChild(MixCard(mixData));
        });

    } catch (error) {
        console.error('Error fetching new releases:', error);
        grid.innerHTML = '<p style="color: var(--text-negative);">Error al cargar lanzamientos</p>';
    }
}