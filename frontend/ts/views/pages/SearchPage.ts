import { spotifyApiCall } from "@/api/spotifyClient.js";
import { SpotifyEndpoints } from "@/api/endpoints.js";
import { navigateTo } from "@/utils/router.js";

interface Track {
    id: string;
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: { url: string }[];
    };
    duration_ms: number;
}

interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
    genres: string[];
}

interface Album {
    id: string;
    name: string;
    artists: { name: string }[];
    images: { url: string }[];
    release_date: string;
}

interface Playlist {
    id: string;
    name: string;
    images: { url: string }[];
    owner: { display_name: string };
    tracks: { total: number };
}

interface SearchResults {
    tracks?: { items: Track[] };
    artists?: { items: Artist[] };
    albums?: { items: Album[] };
    playlists?: { items: Playlist[] };
}

const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const defaultCover = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect fill='%23282828' width='80' height='80'/%3E%3Ccircle cx='40' cy='40' r='20' fill='%23535353'/%3E%3C/svg%3E";

// Search icon SVG
const searchIconSvg = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 1 0 1.414-1.414l-4.344-4.344a9.157 9.157 0 0 0 2.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"/></svg>`;

export const SearchPage = async (): Promise<HTMLElement> => {
    const container = document.createElement("div");
    container.className = "search-page";

    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q') || '';

    // Mobile Search Input (shown at top on mobile)
    const mobileSearchWrapper = document.createElement("div");
    mobileSearchWrapper.className = "mobile-search-wrapper";

    const searchInputContainer = document.createElement("div");
    searchInputContainer.className = "search-page-input-container";

    const searchIcon = document.createElement("span");
    searchIcon.className = "search-page-icon";
    searchIcon.innerHTML = searchIconSvg;
    searchInputContainer.appendChild(searchIcon);

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.id = "search-page-input";
    searchInput.className = "search-page-input";
    searchInput.placeholder = "¿Qué quieres escuchar?";
    searchInput.value = query; // Pre-fill with current query
    searchInput.autocomplete = "off";
    searchInput.setAttribute("autocapitalize", "off");
    searchInput.setAttribute("autocorrect", "off");
    searchInput.setAttribute("spellcheck", "false");

    // Handle Enter key to search
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const newQuery = searchInput.value.trim();
            if (newQuery) {
                navigateTo(`/search?q=${encodeURIComponent(newQuery)}`);
            }
        }
    });

    searchInputContainer.appendChild(searchInput);
    mobileSearchWrapper.appendChild(searchInputContainer);
    container.appendChild(mobileSearchWrapper);

    // Header (shows results title when there's a query)
    if (query) {
        const header = document.createElement("div");
        header.className = "search-header";

        const title = document.createElement("h1");
        title.className = "search-title";
        title.textContent = `Resultados para "${query}"`;

        header.appendChild(title);
        container.appendChild(header);
    }

    // Results container
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "search-results";
    resultsContainer.id = "search-results";

    if (query) {
        // Show loading state
        resultsContainer.innerHTML = '<div class="search-loading">Buscando...</div>';
        container.appendChild(resultsContainer);

        try {
            const searchUrl = `${SpotifyEndpoints.search}?q=${encodeURIComponent(query)}&type=track,artist,album,playlist&limit=10`;
            const results = await spotifyApiCall<SearchResults>(searchUrl, 'GET');

            resultsContainer.innerHTML = '';

            // Render results
            renderSearchResults(resultsContainer, results, query);
        } catch (error) {
            console.error('Error searching:', error);
            resultsContainer.innerHTML = '<div class="search-error">Error al buscar. Intenta de nuevo.</div>';
        }
    } else {
        // Show browse categories or recent searches
        resultsContainer.innerHTML = '<div class="search-empty">Escribe algo para buscar canciones, artistas, álbumes o playlists.</div>';
        container.appendChild(resultsContainer);
    }

    // Auto-focus on input if no query (only on mobile)
    if (!query) {
        setTimeout(() => {
            if (window.innerWidth <= 431) {
                searchInput.focus();
            }
        }, 100);
    }

    return container;
};

function renderSearchResults(container: HTMLElement, results: SearchResults, query: string): void {
    // Top Result + Songs section
    const topSection = document.createElement("div");
    topSection.className = "search-top-section";

    // Top Result (always first track)
    const topTrack = results.tracks?.items?.filter(t => t !== null)?.[0];
    if (topTrack) {
        const topResult = document.createElement("div");
        topResult.className = "search-top-result";

        const topResultTitle = document.createElement("h2");
        topResultTitle.className = "search-section-title";
        topResultTitle.textContent = "Mejor resultado";
        topResult.appendChild(topResultTitle);

        const topResultCard = document.createElement("div");
        topResultCard.className = "top-result-card";

        const img = document.createElement("img");
        img.className = "top-result-image";
        img.src = topTrack.album?.images?.[0]?.url || defaultCover;
        img.alt = topTrack.name;
        topResultCard.appendChild(img);

        const name = document.createElement("h3");
        name.className = "top-result-name";
        name.textContent = topTrack.name;
        topResultCard.appendChild(name);

        const artist = document.createElement("span");
        artist.className = "top-result-type";
        artist.textContent = `Canción • ${topTrack.artists?.map(a => a.name).join(', ') || 'Artista desconocido'}`;
        topResultCard.appendChild(artist);

        topResult.appendChild(topResultCard);
        topSection.appendChild(topResult);
    }

    // Songs section
    if (results.tracks?.items?.length) {
        const songsSection = document.createElement("div");
        songsSection.className = "search-songs-section";

        const songsTitle = document.createElement("h2");
        songsTitle.className = "search-section-title";
        songsTitle.textContent = "Canciones";
        songsSection.appendChild(songsTitle);

        const songsList = document.createElement("div");
        songsList.className = "songs-list";

        results.tracks.items.filter(track => track !== null).slice(0, 4).forEach(track => {
            const songItem = document.createElement("div");
            songItem.className = "song-item";

            const img = document.createElement("img");
            img.className = "song-cover";
            img.src = track.album?.images?.[2]?.url || track.album?.images?.[0]?.url || defaultCover;
            img.alt = track.name;
            songItem.appendChild(img);

            const info = document.createElement("div");
            info.className = "song-info";

            const name = document.createElement("span");
            name.className = "song-name";
            name.textContent = track.name;
            info.appendChild(name);

            const artist = document.createElement("span");
            artist.className = "song-artist";
            artist.textContent = track.artists.map(a => a.name).join(', ');
            info.appendChild(artist);

            songItem.appendChild(info);

            const duration = document.createElement("span");
            duration.className = "song-duration";
            duration.textContent = formatDuration(track.duration_ms);
            songItem.appendChild(duration);

            songsList.appendChild(songItem);
        });

        songsSection.appendChild(songsList);
        topSection.appendChild(songsSection);
    }

    container.appendChild(topSection);

    // Artists section
    if (results.artists?.items?.length) {
        const validItems = results.artists.items.filter(item => item !== null);
        if (validItems.length > 0) {
            const section = createCardSection("Artistas", validItems.slice(0, 6), 'artist');
            container.appendChild(section);
        }
    }

    // Albums section
    if (results.albums?.items?.length) {
        const validItems = results.albums.items.filter(item => item !== null);
        if (validItems.length > 0) {
            const section = createCardSection("Álbumes", validItems.slice(0, 6), 'album');
            container.appendChild(section);
        }
    }

    // Playlists section
    if (results.playlists?.items?.length) {
        const validItems = results.playlists.items.filter(item => item !== null);
        if (validItems.length > 0) {
            const section = createCardSection("Playlists", validItems.slice(0, 6), 'playlist');
            container.appendChild(section);
        }
    }
}

function createCardSection(title: string, items: (Artist | Album | Playlist)[], type: 'artist' | 'album' | 'playlist'): HTMLElement {
    const section = document.createElement("div");
    section.className = "search-card-section";

    const sectionTitle = document.createElement("h2");
    sectionTitle.className = "search-section-title";
    sectionTitle.textContent = title;
    section.appendChild(sectionTitle);

    const grid = document.createElement("div");
    grid.className = "search-cards-grid";

    items.forEach(item => {
        // Skip null items
        if (!item) return;

        const card = document.createElement("div");
        card.className = "search-card";

        const img = document.createElement("img");
        img.className = `search-card-image ${type === 'artist' ? 'search-card-image-round' : ''}`;

        if (type === 'artist') {
            img.src = (item as Artist).images?.[0]?.url || defaultCover;
        } else if (type === 'album') {
            img.src = (item as Album).images?.[0]?.url || defaultCover;
        } else {
            img.src = (item as Playlist).images?.[0]?.url || defaultCover;
        }
        img.alt = item.name || 'Unknown';
        card.appendChild(img);

        const name = document.createElement("span");
        name.className = "search-card-name";
        name.textContent = item.name;
        card.appendChild(name);

        const subtitle = document.createElement("span");
        subtitle.className = "search-card-subtitle";

        if (type === 'artist') {
            subtitle.textContent = "Artista";
        } else if (type === 'album') {
            const album = item as Album;
            const year = album.release_date?.split('-')[0] || '';
            subtitle.textContent = `${year} • ${album.artists?.map(a => a.name).join(', ')}`;
        } else {
            const playlist = item as Playlist;
            subtitle.textContent = `De ${playlist.owner?.display_name}`;
        }
        card.appendChild(subtitle);

        grid.appendChild(card);
    });

    section.appendChild(grid);
    return section;
}
