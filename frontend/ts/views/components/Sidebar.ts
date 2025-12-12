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
            <div class="sidebar-title">
                <svg class="sidebar-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zM15.5 2.134A1 1 0 0 0 14 3v18a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6.464a1 1 0 0 0-.5-.866l-6-3.464zM9 2a1 1 0 0 0-1 1v18a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"/>
                </svg>
                <span class="sidebar-title-text">Tu biblioteca</span>
            </div>
            <div class="sidebar-actions">
                <button class="sidebar-btn sidebar-create" aria-label="Crear playlist">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"/>
                    </svg>
                    <span>Crear</span>
                </button>
                <button class="sidebar-btn sidebar-collapse" aria-label="Colapsar">
                    <svg viewBox="0 0 16 16" fill="currentColor">
                        <path d="M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                        <path d="M14.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C7.713 12.69 7 12.345 7 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="sidebar-library" id="sidebar-library">
        </div>
    `;

    const collapseBtn = sidebar.querySelector('.sidebar-collapse');
    collapseBtn?.addEventListener('click', () => {
        isCollapsed = !isCollapsed;
        sidebar.classList.toggle('collapsed', isCollapsed);
        document.querySelector('.main-content')?.classList.toggle('sidebar-collapsed', isCollapsed);
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
