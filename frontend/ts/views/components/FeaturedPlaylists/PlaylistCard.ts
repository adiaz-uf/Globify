export const PlaylistCard = (img: string, title: string) => {
    const playlist = document.createElement('div');
    playlist.classList.add('playlist-card');
    playlist.innerHTML = `
        <img src="${img}" alt="Playlist cover">
        <h3>${title}</h3>
        <button class="play-button" aria-label="Play ${title}">
            <span class="icon-play"></span>
        </button>
    `;
    return playlist;
}
