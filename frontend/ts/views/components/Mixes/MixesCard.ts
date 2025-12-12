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

