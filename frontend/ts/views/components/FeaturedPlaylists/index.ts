import { PlaylistCard } from "@/views/components/FeaturedPlaylists/PlaylistCard.js";
import { applyColorGlow } from "@/utils/colorExtractor.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";
import { SpotifyEndpoints } from "@/api/endpoints.js";

interface SpotifyPlaylist {
    id: string;
    name: string;
    images: { url: string }[];
}

interface MyPlaylistsResponse {
    items: SpotifyPlaylist[];
    total: number;
}

export const FeaturedPlayList = () => {
    const featuredPlayList = document.createElement('div');
    featuredPlayList.classList.add('featured-playlists');

    const title = document.createElement('h2');
    title.textContent = 'Tus Playlists';
    featuredPlayList.appendChild(title);

    const grid = document.createElement('div');
    grid.classList.add('playlist-grid');

    grid.innerHTML = '<p style="color: var(--text-subdued);">Cargando...</p>';
    featuredPlayList.appendChild(grid);

    loadUserPlaylists(grid, featuredPlayList);

    return featuredPlayList;
}

async function loadUserPlaylists(grid: HTMLElement, container: HTMLElement) {
    try {
        const data = await spotifyApiCall<MyPlaylistsResponse>(
            SpotifyEndpoints.myPlaylistsPreview,
            'GET'
        );

        grid.innerHTML = '';

        data.items.forEach(playlist => {
            const imageUrl = playlist.images[0]?.url || 'https://placehold.co/150x150/333/white?text=No+Image';
            const card = PlaylistCard(playlist.id, imageUrl, playlist.name);
            grid.appendChild(card);
            applyColorGlow(card, container);
        });

    } catch (error) {
        console.error('Error fetching user playlists:', error);
        grid.innerHTML = '<p style="color: var(--text-negative);">Error al cargar playlists</p>';
    }
}