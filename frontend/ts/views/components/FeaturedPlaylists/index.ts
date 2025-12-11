import { PlaylistCard } from "@/views/components/FeaturedPlaylists/PlaylistCard.js";
import { applyColorGlow } from "@/utils/colorExtractor.js";

// Sample data for testing
const samplePlaylists = [
    { img: "https://placehold.co/150x150/1DB954/white?text=1", title: "Today's Top Hits" },
    { img: "https://placehold.co/150x150/E91E63/white?text=2", title: "Discover Weekly" },
    { img: "https://placehold.co/150x150/9C27B0/white?text=3", title: "Release Radar" },
    { img: "https://placehold.co/150x150/2196F3/white?text=4", title: "Chill Vibes" },
    { img: "https://placehold.co/150x150/FF5722/white?text=5", title: "Workout Mix" },
    { img: "https://placehold.co/150x150/00BCD4/white?text=6", title: "Focus Flow" },
    { img: "https://placehold.co/150x150/8BC34A/white?text=7", title: "Throwback Jams" },
    { img: "https://placehold.co/150x150/FFC107/white?text=8", title: "Party Hits" },
];

export const FeaturedPlayList = () => {
    const featuredPlayList = document.createElement('div');
    featuredPlayList.classList.add('featured-playlists');

    const title = document.createElement('h2');
    title.textContent = 'Destacados';
    featuredPlayList.appendChild(title);

    const grid = document.createElement('div');
    grid.classList.add('playlist-grid');

    samplePlaylists.forEach(playlist => {
        const card = PlaylistCard(playlist.img, playlist.title);
        grid.appendChild(card);
        // Apply color glow effect - pass container as second param
        applyColorGlow(card, featuredPlayList);
    });

    featuredPlayList.appendChild(grid);
    return featuredPlayList;
}