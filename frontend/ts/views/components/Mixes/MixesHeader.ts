export const MixesHeader = (subtitle: string, title: string) => {
    const header = document.createElement("div");
    header.classList.add("mixes-header");
    header.innerHTML = `
        <div class="mixes-header-left">
            <span class="mixes-header-subtitle">${subtitle}</span>
            <h2 class="mixes-header-title">${title}</h2>
        </div>
    `;
    return header;
}
