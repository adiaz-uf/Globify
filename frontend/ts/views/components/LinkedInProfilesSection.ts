import { MixesHeader } from "@/views/components/Mixes/MixesHeader.js";

interface LinkedInProfile {
    name: string;
    role: string;
    imageUrl: string;
    profileUrl: string;
}

export const LinkedInProfilesSection = () => {
    const container = document.createElement("div");
    container.classList.add("linkedin-section");

    // Header matching "Mixes" style
    container.appendChild(MixesHeader("Nuestros", "Perfiles"));

    const grid = document.createElement("div");
    grid.classList.add("linkedin-grid");

    // Profile Data (Placeholders)
    const profiles: LinkedInProfile[] = [
        {
            name: "Alejandro Díaz",
            role: "Developer",
            imageUrl: "/assets/images/Alex.jpg",
            profileUrl: "https://www.linkedin.com/in/alejandro-diaz-ufano/"
        },
        {
            name: "Federico Díaz",
            role: "Developer",
            imageUrl: "/assets/images/fede.jpg",
            profileUrl: "https://www.linkedin.com/in/fedediazdev/"
        }
    ];

    profiles.forEach(profile => {
        const card = document.createElement("a");
        card.href = profile.profileUrl;
        card.target = "_blank";
        card.classList.add("linkedin-card");

        const imgContainer = document.createElement("div");
        imgContainer.classList.add("linkedin-image-container");

        const img = document.createElement("img");
        img.src = profile.imageUrl;
        img.alt = profile.name;
        img.classList.add("linkedin-image");

        imgContainer.appendChild(img);

        const info = document.createElement("div");
        info.classList.add("linkedin-info");

        const name = document.createElement("div");
        name.classList.add("linkedin-name");
        name.textContent = profile.name;

        const role = document.createElement("div");
        role.classList.add("linkedin-desc");
        role.textContent = profile.role;

        info.appendChild(name);
        info.appendChild(role);

        card.appendChild(imgContainer);
        card.appendChild(info);

        grid.appendChild(card);
    });

    container.appendChild(grid);
    return container;
}
