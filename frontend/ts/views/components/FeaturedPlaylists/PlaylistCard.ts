import { navigateTo } from "@/utils/router.js";

export const PlaylistCard = (id: string, img: string, title: string) => {
    const playlist = document.createElement('div');
    playlist.classList.add('playlist-card');
    playlist.innerHTML = `
        <img src="${img}" alt="Playlist cover" crossorigin="anonymous">
        <h3>${title}</h3>
        <button class="play-button" aria-label="Play ${title}">
            <span class="icon-play"></span>
        </button>
    `;

    // Navigate to playlist details on click (but not on play button)
    playlist.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest('.play-button')) {
            navigateTo(`/playlist/${id}`);
        }
    });

    return playlist;
}
