import { navigateTo } from "@/utils/router.js";

interface MixData {
    id: string;
    title: string;
    description: string;
    image: string;
    color: string;
    isPlaylist?: boolean;
}

export const MixCard = (mix: MixData) => {
    const card = document.createElement('div');
    card.classList.add('mix-card');
    card.innerHTML = `
        <div class="mix-card-image">
            <img src="${mix.image}" alt="${mix.title}" crossorigin="anonymous">
            <span class="mix-card-badge" style="background-color: ${mix.color}">${mix.title}</span>
            <button class="mix-card-play" aria-label="Reproducir">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                </svg>
            </button>
        </div>
        <p class="mix-card-description">${mix.description}</p>
    `;

    // Navigate to playlist details on click (only for playlists)
    if (mix.isPlaylist) {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            navigateTo(`/playlist/${mix.id}`);
        });
    }

    return card;
}

