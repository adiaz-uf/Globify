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
        <div class="playlist-banner-gradient" style="background-image: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), url('${props.image}')"></div>
        <div class="playlist-banner-content">
            <img src="${props.image}" alt="${props.title}" class="playlist-banner-image">
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

    return banner;
}
