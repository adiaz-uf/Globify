import { navigateTo } from "@/utils/router.js";
import { spotifyApiCall } from "@/api/spotifyClient.js";
import { SpotifyEndpoints } from "@/api/endpoints.js";

interface SpotifyPlaylist {
    id: string;
    name: string;
    images: { url: string }[];
    owner: { display_name: string };
    tracks: { total: number };
}

interface PlaylistsResponse {
    items: SpotifyPlaylist[];
}

export const LibraryPage = async () => {
    const page = document.createElement('div');
    page.classList.add('library-page');

    // Header
    const header = document.createElement('div');
    header.classList.add('library-header');
    header.innerHTML = `
        <h1 class="library-page-title">Tu biblioteca</h1>
    `;
    page.appendChild(header);

    // Content container
    const content = document.createElement('div');
    content.classList.add('library-content');

    // Loading state
    content.innerHTML = '<p class="library-loading">Cargando tu biblioteca...</p>';
    page.appendChild(content);

    // Load playlists
    try {
        // Clear loading
        content.innerHTML = '';

        // Add liked songs first
        const likedItem = createLibraryItem({
            id: 'liked',
            image: '',
            title: 'Canciones que te gustan',
            subtitle: 'Lista • Tus favoritos',
            isLiked: true
        });
        content.appendChild(likedItem);

        // Fetch user playlists
        const data = await spotifyApiCall<PlaylistsResponse>(
            SpotifyEndpoints.myPlaylists,
            'GET'
        );

        data.items.forEach(playlist => {
            const item = createLibraryItem({
                id: playlist.id,
                image: playlist.images?.[0]?.url || '',
                title: playlist.name,
                subtitle: `Lista • ${playlist.owner.display_name}`,
                isLiked: false
            });
            content.appendChild(item);
        });

    } catch (error) {
        console.error('Error loading library:', error);
        content.innerHTML = '<p class="library-error">Error al cargar tu biblioteca</p>';
    }

    return page;
}

interface LibraryItemProps {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    isLiked: boolean;
}

function createLibraryItem(props: LibraryItemProps) {
    const item = document.createElement('div');
    item.classList.add('library-page-item');

    const imageContent = props.isLiked
        ? `<div class="library-page-item-liked">
               <svg viewBox="0 0 16 16" fill="currentColor">
                   <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"/>
               </svg>
           </div>`
        : `<img src="${props.image || 'https://placehold.co/56x56/333/white?text=♪'}" alt="${props.title}" class="library-page-item-image">`;

    item.innerHTML = `
        ${imageContent}
        <div class="library-page-item-info">
            <span class="library-page-item-title">${props.title}</span>
            <span class="library-page-item-subtitle">${props.subtitle}</span>
        </div>
        <svg class="library-page-item-arrow" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.97 2.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L9.44 8 4.97 3.53a.75.75 0 0 1 0-1.06z"/>
        </svg>
    `;

    item.addEventListener('click', () => {
        if (props.isLiked) {
            navigateTo('/liked');
        } else {
            navigateTo(`/playlist/${props.id}`);
        }
    });

    return item;
}
