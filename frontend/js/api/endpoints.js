export const SpotifyEndpoints = {
    // === USER PROFILE  ===
    // Retrieve current user's profile (name, photo, ID)
    currentUser: '/me',
    // === HOME & CATEGORIES  ===
    // List of categories (Mood, Party, etc.)
    // Note: Limit set to 50 as per general instructions
    categories: '/browse/categories?limit=50',
    // Get playlists for a specific category (requires category ID)
    getCategoryPlaylists: (categoryId) => `/browse/categories/${categoryId}/playlists?limit=50`,
    // New releases (Optional, but useful for populating Home content)
    newReleases: '/browse/new-releases?limit=20',
    // === PLAYLISTS ===
    // Retrieve the logged-in user's playlists
    myPlaylists: '/me/playlists?limit=50',
    // specific playlist details (tracks, images, description)
    getPlaylistDetails: (playlistId) => `/playlists/${playlistId}`,
    // Get tracks of a specific playlist (explicit limit of 50) 
    getPlaylistTracks: (playlistId) => `/playlists/${playlistId}/tracks?limit=50`,
    // === FAVORITES / SAVED TRACKS ===
    // List of tracks saved/liked by the user
    savedTracks: '/me/tracks?limit=50',
    // Check if user follows certain tracks (useful for toggling the "heart" icon)
    checkSavedTracks: '/me/tracks/contains',
    // === SEARCH ===
    // Base search endpoint. 
    // Usage: Append `?q=query&type=track&limit=50`
    search: '/search',
    // === PLAYER ===
    // Get information about the currently playing track and context
    playerState: '/me/player',
    // Start or Resume playback
    // Note: Requires an active Spotify device or Web Playback SDK
    play: '/me/player/play',
    // Pause playback
    pause: '/me/player/pause',
    // Skip to next track
    // (Note: Random/Loop/Next/Prev are not strictly mandatory, but useful to have mapped)
    next: '/me/player/next',
    // Skip to previous track
    previous: '/me/player/previous',
};
//# sourceMappingURL=endpoints.js.map