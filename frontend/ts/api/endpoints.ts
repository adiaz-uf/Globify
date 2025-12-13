export const SpotifyEndpoints = {
    // === USER PROFILE  ===
    // Retrieve current user's profile (name, photo, ID)
    currentUser: '/me',

    // === ARTISTS ===
    // Get artist by ID - Usage: getArtist(artistId)
    getArtist: (artistId: string) => `/artists/${artistId}`,

    // === HOME & CATEGORIES  ===
    // List of categories (Mood, Party, etc.)
    // Note: Limit set to 50 as per general instructions
    categories: '/browse/categories?limit=50',

    myCategories: '/browse/categories?limit=10',

    // Get playlists for a specific category (requires category ID)
    getCategoryPlaylists: (categoryId: string) => `/browse/categories/${categoryId}/playlists?limit=50`,

    // New releases (Optional, but useful for populating Home content)
    newReleases: '/browse/new-releases?limit=20',

    // New releases paginated
    getNewReleasesPaginated: (offset: number, limit: number = 8) => `/browse/new-releases?limit=${limit}&offset=${offset}`,

    // === PLAYLISTS ===
    // Retrieve the logged-in user's playlists
    myPlaylists: '/me/playlists?limit=50',

    // Preview: Only first 8 playlists for home grid
    myPlaylistsPreview: '/me/playlists?limit=8',

    // Paginated: Get playlists with offset for different sections
    getMyPlaylistsPaginated: (offset: number, limit: number = 8) => `/me/playlists?limit=${limit}&offset=${offset}`,

    // specific playlist details (tracks, images, description)
    getPlaylistDetails: (playlistId: string) => `/playlists/${playlistId}`,

    // Get tracks of a specific playlist (explicit limit of 50) 
    getPlaylistTracks: (playlistId: string) => `/playlists/${playlistId}/tracks?limit=50`,

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

    // Toggle shuffle mode
    // Usage: PUT with query param ?state=true|false
    shuffle: '/me/player/shuffle',

    // Set repeat mode
    // Usage: PUT with query param ?state=off|track|context
    repeat: '/me/player/repeat',

    // Seek to position in currently playing track
    // Usage: PUT with query param ?position_ms=<milliseconds>
    seek: '/me/player/seek',

    // Set volume
    // Usage: PUT with query param ?volume_percent=0-100
    volume: '/me/player/volume',

    // === USER TOP ITEMS ===
    // Get user's top artists (time_range: short_term = ~4 weeks, medium_term = ~6 months, long_term = years)
    topArtists: (limit: number = 6, timeRange: string = 'short_term') =>
        `/me/top/artists?limit=${limit}&time_range=${timeRange}`,

    // Get user's top tracks
    topTracks: (limit: number = 6, timeRange: string = 'short_term') =>
        `/me/top/tracks?limit=${limit}&time_range=${timeRange}`,

    // === USER FOLLOWING ===
    // Get artists followed by the current user
    followingArtists: (limit: number = 6) => `/me/following?type=artist&limit=${limit}`,

    // === PLAYBACK CONTEXT ===
    // Start playback with specific context (playlist/album) or specific track URIs
    // Usage: PUT with body { context_uri: "spotify:playlist:xxx" } or { uris: ["spotify:track:xxx"], offset: { position: 0 } }
    playContext: '/me/player/play',
};