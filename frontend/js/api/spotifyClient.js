import { getAccessToken } from './spotifyAuth.js';
// Base function for any HTTP call
async function fetchRequest(url, options = {}) {
    const { method = 'GET', headers = {}, body, isUrlEncoded = false } = options;
    // Default headers
    const requestHeaders = { ...headers };
    // Default content type
    if (!requestHeaders['Content-Type'] && !isUrlEncoded) {
        requestHeaders['Content-Type'] = 'application/json';
    }
    else if (isUrlEncoded) {
        requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    // Prepare the body
    let requestBody = body;
    if (body) {
        if (isUrlEncoded && body instanceof URLSearchParams) {
            requestBody = body;
        }
        else if (isUrlEncoded && typeof body === 'object') {
            requestBody = new URLSearchParams(body);
        }
        else {
            requestBody = JSON.stringify(body);
        }
    }
    try {
        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            body: requestBody
        });
        if (!response.ok) {
            // Handle global errors like 401 (Token expired)
            if (response.status === 401) {
                console.error("Token expired or invalid");
                // TODO: Redirect to login or refresh token
            }
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        // If the response has no content (e.g. 204), return null
        if (response.status === 204)
            return null;
        return await response.json();
    }
    catch (error) {
        console.error(`Request to ${url} failed:`, error);
        throw error;
    }
}
/**
 * Spotify API client (automatically adds the token)
 */
export async function spotifyApiCall(endpoint, method = 'GET', body) {
    const token = getAccessToken();
    if (!token) {
        throw new Error("No access token found. User must log in.");
    }
    const baseUrl = 'https://api.spotify.com/v1';
    // Intelligent URL handling: if it's complete, use it, otherwise add the base
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;
    return fetchRequest(url, {
        method,
        body,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}
/**
 * Export the base function for any HTTP call
 */
export { fetchRequest };
//# sourceMappingURL=spotifyClient.js.map