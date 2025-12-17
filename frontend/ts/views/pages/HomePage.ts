import { FeaturedPlayList } from "@/views/components/FeaturedPlaylists/index.js";
import { Mixes } from "@/views/components/Mixes/index.js";
import { LinkedInProfilesSection } from "@/views/components/LinkedInProfilesSection.js";

const mixesSections = [
    { subtitle: "Hecho para", title: "Ti", offset: 0, type: 'playlists' as const },
    { subtitle: "Nuevos", title: "Lanzamientos", offset: 0, type: 'newReleases' as const },
    { subtitle: "Más de tus", title: "Playlists", offset: 8, type: 'playlists' as const },
    { subtitle: "Más", title: "Novedades", offset: 8, type: 'newReleases' as const },
];

export const HomePage = () => {
    const div = document.createElement("div");
    div.appendChild(FeaturedPlayList());
    div.appendChild(LinkedInProfilesSection());

    mixesSections.forEach(section => {
        div.appendChild(Mixes(section.subtitle, section.title, section.offset, section.type));
    });

    return div;
}