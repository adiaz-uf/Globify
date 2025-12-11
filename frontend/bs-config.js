/**
 * Browser-sync configuration for SPA
 * Redirects all routes to index.html for client-side routing
 */
module.exports = {
    server: {
        baseDir: "./",
        middleware: [
            // SPA fallback - redirect all routes to index.html
            function (req, res, next) {
                // If the request is for a file with extension, serve it
                if (req.url.includes('.')) {
                    return next();
                }
                // Otherwise, serve index.html
                req.url = '/index.html';
                return next();
            }
        ]
    },
    files: [
        "js/**/*.js",
        "css/**/*.css",
        "*.html"
    ],
    host: "127.0.0.1",
    port: 8080,
    notify: false,
    open: false
};
