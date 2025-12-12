interface TrackProps {
    index: number;
    title: string;
    artist: string;
    album: string;
    albumImage: string;
    duration: string;
    isLiked?: boolean;
}

export const TrackCard = (props: TrackProps) => {
    const track = document.createElement('div');
    track.classList.add('track-card');

    track.innerHTML = `
        <div class="track-index-container">
            <span class="track-index">${props.index}</span>
            <button class="track-play-btn" aria-label="Reproducir">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
            </button>
        </div>
        <div class="track-info">
            <img src="${props.albumImage}" alt="${props.album}" class="track-album-img">
            <div class="track-details">
                <span class="track-title">${props.title}</span>
                <span class="track-artist">${props.artist}</span>
            </div>
        </div>
        <span class="track-album">${props.album}</span>
        <div class="track-actions">
            <button class="track-like ${props.isLiked ? 'liked' : ''}" aria-label="Me gusta">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="currentColor"/>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#000"/>
                </svg>
            </button>
            <span class="track-duration">${props.duration}</span>
        </div>
    `;

    return track;
}

