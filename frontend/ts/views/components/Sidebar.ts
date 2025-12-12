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

let isCollapsed = false;

export const Sidebar = () => {
    const sidebar = document.createElement('aside');
    sidebar.id = 'sidebar';
    sidebar.classList.add('sidebar');

    sidebar.innerHTML = `
        <div class="sidebar-header">
            <button class="sidebar-title" title="Tu biblioteca">
                <svg class="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"/>
                </svg>
                <span class="sidebar-title-text">Tu biblioteca</span>
            </button>
        </div>
        <div class="sidebar-library" id="sidebar-library">
        </div>
    `;

    const titleBtn = sidebar.querySelector('.sidebar-title') as HTMLElement;
    titleBtn?.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        sidebar.classList.toggle('collapsed', isCollapsed);
        document.querySelector('.main-content')?.classList.toggle('sidebar-collapsed', isCollapsed);
        titleBtn.title = isCollapsed ? 'Abrir biblioteca' : 'Tu biblioteca';
    });

    loadLibrary(sidebar);

    return sidebar;
}

async function loadLibrary(sidebar: HTMLElement) {
    const library = sidebar.querySelector('#sidebar-library');
    if (!library) return;

    const likedSongs = createLibraryItem({
        id: 'liked',
        image: '',
        title: 'Canciones que te gustan',
        subtitle: 'Lista • Tus favoritos',
        isLiked: true
    });
    library.appendChild(likedSongs);

    try {
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
            library.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading library:', error);
    }
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
    item.classList.add('library-item');

    const imageContent = props.isLiked
        ? `<div class="library-item-liked">
               <svg viewBox="0 0 16 16" fill="currentColor">
                   <path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"/>
               </svg>
           </div>`
        : `<img src="${props.image || 'https://placehold.co/48x48/333/white?text=♪'}" alt="${props.title}" class="library-item-image">`;

    item.innerHTML = `
        ${imageContent}
        <div class="library-item-info">
            <span class="library-item-title">${props.title}</span>
            <span class="library-item-subtitle">${props.subtitle}</span>
        </div>
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
