import { FeaturedPlayList } from "@/views/components/FeaturedPlaylists/index.js";
import { Mixes } from "@/views/components/Mixes/index.js";

const mixesSections = [
    { subtitle: "Hecho para", title: "Fede" },
    { subtitle: "Tus favoritos", title: "Escuchados recientemente" },
    { subtitle: "Basado en lo que escuchas", title: "Artistas similares" },
    { subtitle: "Más de lo que te gusta", title: "Descubre algo nuevo" },
    { subtitle: "", title: "Sumérgete de nuevo en tu música" },
    { subtitle: "", title: "Escuchado recientemente" },
];

export const HomePage = () => {
    const div = document.createElement("div");
    div.appendChild(FeaturedPlayList());

    mixesSections.forEach(section => {
        div.appendChild(Mixes(section.subtitle, section.title));
    });

    return div;
}