import { spotifyApiCall } from "@/api/spotifyClient.js";
import { SpotifyEndpoints } from "@/api/endpoints.js";
import { Banner } from "@/views/components/PlaylistDetails/Banner.js";
import { ActionButtons } from "@/views/components/PlaylistDetails/ActionButtons.js";
import { TrackList } from "@/views/components/PlaylistDetails/TrackList.js";
import { playLikedSongs } from "@/views/components/Footer.js";

interface SavedTrack {
    track: {
        id: string;
        name: string;
        artists: { name: string }[];
        album: {
            name: string;
            images: { url: string }[];
        };
        duration_ms: number;
    };
}

interface SavedTracksResponse {
    items: SavedTrack[];
    total: number;
}

export const SavedSongsPage = async () => {
    const page = document.createElement('div');
    page.classList.add('playlist-page');

    page.innerHTML = '<p style="color: var(--text-subdued); padding: 24px;">Cargando canciones guardadas...</p>';

    try {
        const data = await spotifyApiCall<SavedTracksResponse>(
            SpotifyEndpoints.savedTracks,
            'GET'
        );

        page.innerHTML = '';

        // Banner with liked songs design
        const banner = Banner({
            image: '',
            type: 'Playlist',
            title: 'Canciones que te gustan',
            description: 'Tu colección de canciones favoritas',
            owner: 'Tu biblioteca',
            totalTracks: data.total
        });

        // Custom gradient for liked songs (purple)
        const gradientDiv = banner.querySelector('.playlist-banner-gradient') as HTMLElement;
        if (gradientDiv) {
            gradientDiv.style.background = 'linear-gradient(to bottom, #5d4a7a 0%, #121212 100%)';
        }

        // Custom image for liked songs
        const imageEl = banner.querySelector('.playlist-banner-image') as HTMLImageElement;
        if (imageEl) {
            imageEl.style.display = 'none';
            const likedIcon = document.createElement('div');
            likedIcon.classList.add('liked-songs-icon');
            likedIcon.innerHTML = `
                <svg viewBox="0 0 16 16" fill="currentColor">
                    <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"/>
                </svg>
            `;
            imageEl.parentElement?.insertBefore(likedIcon, imageEl);
        }

        page.appendChild(banner);

        // Action buttons with playback handlers
        page.appendChild(ActionButtons({
            onPlayAll: () => {
                playLikedSongs();
            },
            onShuffle: async () => {
                // Enable shuffle first, then play liked songs
                try {
                    await spotifyApiCall(`${SpotifyEndpoints.shuffle}?state=true`, 'PUT');
                    playLikedSongs();
                } catch (error) {
                    console.error('Error enabling shuffle:', error);
                }
            }
        }));

        // Format tracks for TrackList component
        const tracks = data.items.map(item => ({
            track: item.track
        }));

        // Pass undefined for playlistId - TrackList will use liked songs collection
        page.appendChild(TrackList(tracks));

    } catch (error) {
        console.error('Error loading saved songs:', error);
        page.innerHTML = '<p style="color: var(--text-negative); padding: 24px;">Error al cargar canciones guardadas</p>';
    }

    return page;
}