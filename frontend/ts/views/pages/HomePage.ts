import { FeaturedPlayList } from "@/views/components/FeaturedPlaylists/index.js";
export const HomePage = () => {
    const div = document.createElement("div");
    div.appendChild(FeaturedPlayList());
    return div;
}