import { getDominantColor } from "@/utils/colorExtractor.js";

interface BannerProps {
    image: string;
    type: string;
    title: string;
    description: string;
    owner: string;
    totalTracks: number;
}

export const Banner = (props: BannerProps) => {
    const banner = document.createElement('div');
    banner.classList.add('playlist-banner');

    banner.innerHTML = `
        <div class="playlist-banner-gradient"></div>
        <div class="playlist-banner-content">
            <img src="${props.image}" alt="${props.title}" class="playlist-banner-image" crossorigin="anonymous">
            <div class="playlist-banner-info">
                <span class="playlist-banner-type">${props.type}</span>
                <h1 class="playlist-banner-title">${props.title}</h1>
                <p class="playlist-banner-description">${props.description}</p>
                <div class="playlist-banner-meta">
                    <span class="playlist-banner-owner">${props.owner}</span>
                    <span class="playlist-banner-separator">•</span>
                    <span class="playlist-banner-tracks">${props.totalTracks} canciones</span>
                </div>
            </div>
        </div>
    `;

    // Extract dominant color and apply gradient background
    const img = banner.querySelector('.playlist-banner-image') as HTMLImageElement;
    const gradientDiv = banner.querySelector('.playlist-banner-gradient') as HTMLElement;

    if (img && gradientDiv) {
        getDominantColor(img).then(color => {
            // Convert rgba to rgb for gradient (remove alpha)
            const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (rgbMatch) {
                const [, r, g, b] = rgbMatch;
                gradientDiv.style.background = `linear-gradient(to bottom, rgb(${r}, ${g}, ${b}) 0%, #121212 100%)`;
            }
        });
    }

    return banner;
}

