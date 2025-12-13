import { getValidAccessToken, refreshAccessToken, logout } from './spotifyAuth.js';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestOptions {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: any;
    isUrlEncoded?: boolean; // JSON or Form(Auth)
}

// Base function for any HTTP call
async function fetchRequest<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body, isUrlEncoded = false } = options;

    // Default headers
    const requestHeaders: Record<string, string> = { ...headers };

    // Default content type
    if (!requestHeaders['Content-Type'] && !isUrlEncoded) {
        requestHeaders['Content-Type'] = 'application/json';
    } else if (isUrlEncoded) {
        requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    // Prepare the body
    let requestBody = body;
    if (body) {
        if (isUrlEncoded && body instanceof URLSearchParams) {
            requestBody = body;
        } else if (isUrlEncoded && typeof body === 'object') {
            requestBody = new URLSearchParams(body);
        } else {
            requestBody = JSON.stringify(body);
        }
    }

    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: requestBody
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // If the response has no content (e.g. 204), return null
    if (response.status === 204) return null as T;

    return await response.json();
}

/**
 * Spotify API client with automatic token refresh
 * Automatically refreshes token if expired and retries on 401
 */
export async function spotifyApiCall<T>(
    endpoint: string,
    method: HttpMethod = 'GET',
    body?: any,
    isRetry: boolean = false
): Promise<T> {
    // Get a valid token (refreshes if expired)
    const token = await getValidAccessToken();

    if (!token) {
        throw new Error("No access token found. User must log in.");
    }

    const baseUrl = 'https://api.spotify.com/v1';
    const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`;

    // Build request headers
    const requestHeaders: Record<string, string> = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    // Prepare body if present
    let requestBody: string | undefined;
    if (body) {
        requestBody = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, {
            method,
            headers: requestHeaders,
            body: requestBody
        });

        // Handle 401 Unauthorized - try to refresh token once
        if (response.status === 401 && !isRetry) {
            console.log("Received 401, attempting to refresh token...");

            const newToken = await refreshAccessToken();

            if (newToken) {
                // Retry the request with the new token
                return spotifyApiCall<T>(endpoint, method, body, true);
            } else {
                // Refresh failed, logout user
                console.error("Token refresh failed, logging out...");
                logout();
                throw new Error("Session expired. Please log in again.");
            }
        }

        if (!response.ok) {
            const errorBody = await response.text();
            console.error(`Spotify API Error: ${response.status}`, errorBody);
            throw new Error(`Spotify API Error: ${response.status} ${response.statusText}`);
        }

        // If the response has no content (e.g. 204), return null
        if (response.status === 204) return null as T;

        // Some Spotify endpoints return empty or non-JSON responses even with 200
        const contentType = response.headers.get('content-type');
        const contentLength = response.headers.get('content-length');

        // Check if response is likely JSON
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }

        // If content-length is 0 or very small, it's likely empty
        if (contentLength === '0' || contentLength === null) {
            return null as T;
        }

        // Try to parse as JSON, but handle non-JSON gracefully
        try {
            const text = await response.text();
            if (!text || text.trim() === '') {
                return null as T;
            }
            return JSON.parse(text);
        } catch {
            // Response is not JSON, return null (command was successful)
            return null as T;
        }
    } catch (error) {
        console.error(`Request to ${url} failed:`, error);
        throw error;
    }
}

/**
 * Export the base function for any HTTP call (used for auth endpoints)
 */
export { fetchRequest };