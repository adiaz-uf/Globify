export const NotFoundPage = (): HTMLElement => {
    const container = document.createElement("div");
    container.classList.add("error-page");
    container.innerHTML = `
        <div class="error-content">
            <div class="error-icon">
                <img src="/assets/icons/spotify.svg" alt="Spotify Logo">
            </div>
            <h2>Página no encontrada</h2>
            <p>La página que buscas no existe o ha sido movida.</p>
            <a href="/" class="btn-home" data-link>
                <span class="icon-home"></span>
                Volver al inicio
            </a>
        </div>
    `;

    return container;
};