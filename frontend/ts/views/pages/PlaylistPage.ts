import { Banner } from "@/views/components/PlaylistDetails/Banner.js";
import { ActionButtons } from "@/views/components/PlaylistDetails/ActionButtons.js";
import { TrackList } from "@/views/components/PlaylistDetails/TrackList.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";
import { SpotifyEndpoints } from "@/api/endpoints.js";
import { playPlaylist } from "@/views/components/Footer.js";

interface PlaylistDetails {
    id: string;
    name: string;
    description: string;
    images: { url: string }[];
    owner: { display_name: string };
    tracks: { total: number };
}

interface PlaylistTracksResponse {
    items: any[];
}

export const PlaylistPage = async (playlistId: string) => {
    const container = document.createElement('div');
    container.classList.add('playlist-page');

    // Loading state
    container.innerHTML = '<p style="color: var(--text-subdued); padding: 2rem;">Cargando playlist...</p>';

    // Create Spotify URI for the playlist
    const playlistUri = `spotify:playlist:${playlistId}`;

    try {
        // Fetch playlist details
        const playlist = await spotifyApiCall<PlaylistDetails>(
            SpotifyEndpoints.getPlaylistDetails(playlistId),
            'GET'
        );

        // Fetch tracks
        const tracksData = await spotifyApiCall<PlaylistTracksResponse>(
            SpotifyEndpoints.getPlaylistTracks(playlistId),
            'GET'
        );

        // Clear loading
        container.innerHTML = '';

        // Add Banner
        container.appendChild(Banner({
            image: playlist.images?.[0]?.url || 'https://placehold.co/300x300/333/white?text=Playlist',
            type: 'Lista pública',
            title: playlist.name,
            description: playlist.description || '',
            owner: playlist.owner.display_name,
            totalTracks: playlist.tracks.total
        }));

        // Add Action Buttons with playback handlers
        container.appendChild(ActionButtons({
            onPlayAll: () => {
                playPlaylist(playlistUri);
            },
            onShuffle: async () => {
                // Enable shuffle first, then play
                try {
                    await spotifyApiCall(`${SpotifyEndpoints.shuffle}?state=true`, 'PUT');
                    playPlaylist(playlistUri);
                } catch (error) {
                    console.error('Error enabling shuffle:', error);
                }
            }
        }));

        // Add Track List with playlistId for track playback
        container.appendChild(TrackList(tracksData.items, playlistId));

    } catch (error) {
        console.error('Error loading playlist:', error);
        container.innerHTML = '<p style="color: var(--text-negative); padding: 2rem;">Error al cargar la playlist</p>';
    }

    return container;
}