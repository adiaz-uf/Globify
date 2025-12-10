export const NotFoundPage = () => {
    const container = document.createElement("div");
    container.classList.add("error-page");
    container.innerHTML = `
        <h1>404</h1>
        <p>Ups, parece que te has perdido.</p>
        <a href="/" data-link>Volver al inicio</a>
    `;
    return container;
};
//# sourceMappingURL=NotFoundPage.js.map