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

// AUTH LOGIC

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
            isUrlEncoded: true // form logic
        });

        // Store tokens and expiration time
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // data.expires_in is usually 3600 seconds
        const now = new Date().getTime();
        localStorage.setItem('token_expiry', (now + data.expires_in * 1000).toString());

        // Clean up the URL
        window.history.replaceState({}, document.title, "/");
        return data.access_token;
    } catch (error) {
        console.error("Error getting token", error);
        return null;
    }
}

export function getAccessToken(): string | null {
    // TODO: Add logic to refresh the token if it has expired
    return localStorage.getItem('access_token');
}

export function logout() {
    localStorage.clear();
    window.location.href = redirectUri;
}

export function isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
}