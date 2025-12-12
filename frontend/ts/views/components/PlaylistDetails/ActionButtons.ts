export const ActionButtons = () => {
    const container = document.createElement('div');
    container.classList.add('playlist-actions');

    container.innerHTML = `
        <button class="action-btn action-btn-play" aria-label="Reproducir">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v14l11-7-11-7z"/>
            </svg>
        </button>
        <button class="action-btn action-btn-shuffle" aria-label="Aleatorio">
            <svg viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06l2.306-2.306a.75.75 0 0 0 0-1.06L13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"/>
                <path d="m7.5 10.723.98-1.167 1.795 2.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.306 2.306a.75.75 0 0 1 0 1.06l-2.306 2.306a.75.75 0 1 1-1.06-1.06l1.018-1.018H11.16a3.75 3.75 0 0 1-2.873-1.34l-1.787-2.13z"/>
            </svg>
        </button>
        <button class="action-btn action-btn-save saved" aria-label="Guardada">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="currentColor"/>
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#000"/>
            </svg>
        </button>
    `;

    return container;
}
