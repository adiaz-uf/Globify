export const clientId = "<client_id>>";
export const redirectUri = "http://127.0.0.1:8080";

// Scopes required to read profile, playlists, and play music
export const scopes = [
    'user-read-private',
    'user-read-email',
    'user-library-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-top-read',
    'user-follow-read', 
].join(' ');