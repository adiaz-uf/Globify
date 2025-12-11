interface MixData {
    id: number;
    title: string;
    description: string;
    image: string;
    color: string;
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
    return card;
}
