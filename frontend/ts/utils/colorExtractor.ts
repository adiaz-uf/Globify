/**
 * Extracts the dominant color from an image using Canvas API
 * No external dependencies required - runs in browser
 */
export function getDominantColor(imgElement: HTMLImageElement): Promise<string> {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            resolve('rgba(255, 255, 255, 0.3)');
            return;
        }

        // Use small size for performance
        canvas.width = 10;
        canvas.height = 10;

        const extractColor = () => {
            try {
                ctx.drawImage(imgElement, 0, 0, 10, 10);
                const imageData = ctx.getImageData(0, 0, 10, 10).data;

                // Calculate average color
                let r = 0, g = 0, b = 0;
                const pixelCount = imageData.length / 4;

                for (let i = 0; i < imageData.length; i += 4) {
                    r += imageData[i];
                    g += imageData[i + 1];
                    b += imageData[i + 2];
                }

                r = Math.round(r / pixelCount);
                g = Math.round(g / pixelCount);
                b = Math.round(b / pixelCount);

                console.log(`🎨 Extracted color: rgb(${r}, ${g}, ${b})`);
                resolve(`rgba(${r}, ${g}, ${b}, 0.4)`);
            } catch (error) {
                // CORS error - use fallback color
                console.warn('Could not extract color (CORS):', error);
                resolve('rgba(255, 255, 255, 0.3)');
            }
        };

        if (imgElement.complete && imgElement.naturalWidth > 0) {
            extractColor();
        } else {
            imgElement.onload = extractColor;
            imgElement.onerror = () => resolve('rgba(255, 255, 255, 0.3)');
        }
    });
}

/**
 * Applies color glow effect to a container when hovering on a card
 * @param card - The playlist card element
 * @param container - The container to apply the glow effect to
 */
export function applyColorGlow(card: HTMLElement, container: HTMLElement): void {
    const img = card.querySelector('img') as HTMLImageElement;
    if (!img) {
        console.warn('No image found in card');
        return;
    }

    getDominantColor(img).then(color => {
        // Create gradient with the dominant color
        const gradient = `linear-gradient(to bottom, ${color} 0%, #121212 70%)`;

        card.addEventListener('mouseenter', () => {
            container.style.background = gradient;
            container.style.transition = 'background 2s ease';
        });

        card.addEventListener('mouseleave', () => {
            container.style.background = '';
        });
    });
}
