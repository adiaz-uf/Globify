import { MixCard } from "@/views/components/Mixes/MixesCard.js";
import { MixesHeader } from "@/views/components/Mixes/MixesHeader.js";

// Sample data with colors like Spotify
const sampleMixes = [
    { id: 1, title: "Mix diario 1", description: "FMK, Milo j, Duki y más", image: "https://placehold.co/300x300/1a1a1a/white?text=Mix+1", color: "#1ed760" },
    { id: 2, title: "Mix diario 2", description: "Ozuna, Maluma, Daddy Yankee y más", image: "https://placehold.co/300x300/2a2a2a/white?text=Mix+2", color: "#e91e63" },
    { id: 3, title: "Mix diario 3", description: "Dani Fernández, Melendi, Charlie US...", image: "https://placehold.co/300x300/3a3a3a/white?text=Mix+3", color: "#ff5722" },
    { id: 4, title: "Mix diario 4", description: "Sebastian Yatra, Pablo Alborán, Reik y más", image: "https://placehold.co/300x300/4a4a4a/white?text=Mix+4", color: "#ffc107" },
    { id: 5, title: "Mix diario 5", description: "Beret, Blake, Don Omar y más", image: "https://placehold.co/300x300/5a5a5a/white?text=Mix+5", color: "#cddc39" },
    { id: 6, title: "Mix diario 6", description: "Ed Sheeran, Capaldi y más...", image: "https://placehold.co/300x300/6a6a6a/white?text=Mix+6", color: "#00bcd4" },
    { id: 7, title: "Chill Mix", description: "Música relajante para desconectar", image: "https://placehold.co/300x300/7a5a7a/white?text=Chill", color: "#9c27b0" },
    { id: 8, title: "Workout Mix", description: "Energía pura para entrenar", image: "https://placehold.co/300x300/8a3a3a/white?text=Workout", color: "#f44336" },
    { id: 9, title: "Focus Mix", description: "Concentración máxima", image: "https://placehold.co/300x300/3a5a8a/white?text=Focus", color: "#2196f3" },
    { id: 10, title: "Party Mix", description: "Los mejores hits para la fiesta", image: "https://placehold.co/300x300/5a8a3a/white?text=Party", color: "#4caf50" },
    { id: 11, title: "Sleep Mix", description: "Sonidos para dormir mejor", image: "https://placehold.co/300x300/2a2a4a/white?text=Sleep", color: "#3f51b5" },
    { id: 12, title: "Road Trip", description: "Canciones para el viaje perfecto", image: "https://placehold.co/300x300/6a4a2a/white?text=Road", color: "#ff9800" },
];

export const Mixes = (subtitle: string, title: string) => {
    const container = document.createElement("div");
    container.classList.add("mixes-section");

    container.appendChild(MixesHeader(subtitle, title));

    const carouselWrapper = document.createElement("div");
    carouselWrapper.classList.add("carousel-wrapper");

    const grid = document.createElement("div");
    grid.classList.add("mixes-grid");

    sampleMixes.forEach(mix => {
        grid.appendChild(MixCard(mix));
    });

    const prevBtn = document.createElement("button");
    prevBtn.classList.add("carousel-arrow", "carousel-arrow-prev");
    prevBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
    prevBtn.setAttribute("aria-label", "Anterior");

    const nextBtn = document.createElement("button");
    nextBtn.classList.add("carousel-arrow", "carousel-arrow-next");
    nextBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;
    nextBtn.setAttribute("aria-label", "Siguiente");

    const updateArrowVisibility = () => {
        const isAtStart = grid.scrollLeft <= 0;
        const isAtEnd = grid.scrollLeft >= grid.scrollWidth - grid.clientWidth - 1;

        prevBtn.classList.toggle("hidden", isAtStart);
        nextBtn.classList.toggle("hidden", isAtEnd);
    };

    const scrollAmount = 400;
    prevBtn.addEventListener("click", () => {
        grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
        grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    grid.addEventListener("scroll", updateArrowVisibility);

    setTimeout(updateArrowVisibility, 100);

    carouselWrapper.appendChild(prevBtn);
    carouselWrapper.appendChild(grid);
    carouselWrapper.appendChild(nextBtn);

    container.appendChild(carouselWrapper);
    return container;
}