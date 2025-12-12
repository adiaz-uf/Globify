import { TrackCard } from "./TrackCard.js";

interface Track {
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

function formatDuration(ms: number): string {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export const TrackList = (tracks: Track[]) => {
    const container = document.createElement('div');
    container.classList.add('track-list');

    // Header
    const header = document.createElement('div');
    header.classList.add('track-list-header');
    header.innerHTML = `
        <span class="track-header-index">#</span>
        <span class="track-header-title">Título</span>
        <span class="track-header-album">Álbum</span>
        <span class="track-header-duration">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
        </span>
    `;
    container.appendChild(header);

    // Tracks
    const trackContainer = document.createElement('div');
    trackContainer.classList.add('track-list-body');

    tracks.forEach((item, index) => {
        if (item.track) {
            const trackCard = TrackCard({
                index: index + 1,
                title: item.track.name,
                artist: item.track.artists.map(a => a.name).join(', '),
                album: item.track.album.name,
                albumImage: item.track.album.images?.[0]?.url || 'https://placehold.co/40x40/333/white?text=No',
                duration: formatDuration(item.track.duration_ms),
                isLiked: false
            });
            trackContainer.appendChild(trackCard);
        }
    });

    container.appendChild(trackContainer);
    return container;
}
