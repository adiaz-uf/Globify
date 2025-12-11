import { clientId, redirectUri, scopes } from '../config.js';
import { fetchRequest } from './spotifyClient.js';

function generateRandomString(length: number): string {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

async function sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

function base64encode(input: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

// ============================================
// TOKEN STORAGE HELPERS
// ============================================

function saveTokens(accessToken: string, refreshToken: string, expiresIn: number): void {
    const now = new Date().getTime();
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('token_expiry', (now + expiresIn * 1000).toString());
}

function getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
}

function getTokenExpiry(): number {
    const expiry = localStorage.getItem('token_expiry');
    return expiry ? parseInt(expiry, 10) : 0;
}

/**
 * Check if the current token is expired or about to expire (within 5 minutes)
 */
function isTokenExpired(): boolean {
    const expiry = getTokenExpiry();
    if (!expiry) return true;

    // Consider expired if less than 5 minutes remaining (300000 ms)
    const bufferTime = 5 * 60 * 1000;
    return Date.now() >= (expiry - bufferTime);
}

// ============================================
// AUTH LOGIC
// ============================================

export async function redirectToSpotifyLogin() {
    const codeVerifier = generateRandomString(128);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Store the verifier locally to use it when returning
    localStorage.setItem('code_verifier', codeVerifier);

    const params = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scopes,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function handleLoginCallback(): Promise<string | null> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) return null;

    const codeVerifier = localStorage.getItem('code_verifier');
    if (!codeVerifier) {
        console.error("Code verifier not found");
        return null;
    }

    const bodyParams = new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
    });

    try {
        const data = await fetchRequest<any>('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: bodyParams,
            isUrlEncoded: true
        });

        // Store tokens and expiration time
        saveTokens(data.access_token, data.refresh_token, data.expires_in);

        // Clean up the URL
        window.history.replaceState({}, document.title, "/");
        return data.access_token;
    } catch (error) {
        console.error("Error getting token", error);
        return null;
    }
}

/**
 * Refresh the access token using the refresh token
 * Returns the new access token or null if refresh fails
 */
export async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        console.error("No refresh token available");
        return null;
    }

    const bodyParams = new URLSearchParams({
        client_id: clientId,
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
    });

    try {
        console.log("Refreshing access token...");

        const data = await fetchRequest<any>('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: bodyParams,
            isUrlEncoded: true
        });

        // Save new tokens (Spotify may return a new refresh_token)
        saveTokens(
            data.access_token,
            data.refresh_token || refreshToken, // Use old refresh token if new one not provided
            data.expires_in
        );

        console.log("Token refreshed successfully");
        return data.access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        // If refresh fails, clear tokens and redirect to login
        logout();
        return null;
    }
}

/**
 * Get the current access token, refreshing if necessary
 * This is the main function to use when making API calls
 */
export async function getValidAccessToken(): Promise<string | null> {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return null;
    }

    // If token is expired or about to expire, refresh it
    if (isTokenExpired()) {
        console.log("Token expired or expiring soon, refreshing...");
        return await refreshAccessToken();
    }

    return token;
}

/**
 * Get the current access token (synchronous, does not refresh)
 * Use getValidAccessToken() for automatic refresh
 */
export function getAccessToken(): string | null {
    return localStorage.getItem('access_token');
}

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expiry');
    localStorage.removeItem('code_verifier');
    window.location.href = redirectUri;
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
}