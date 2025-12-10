// Scopes required to read profile, playlists, and play music
export const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-read-private",
    "user-library-read",
    "user-modify-playback-state",
    "user-read-playback-state",
].join(" ");