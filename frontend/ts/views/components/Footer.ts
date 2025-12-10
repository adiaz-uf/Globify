// SVG Icons for player controls
const icons = {
    shuffle: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06l2.306-2.306a.75.75 0 0 0 0-1.06L13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z"/><path d="m7.5 10.723.98-1.167 1.795 2.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.306 2.306a.75.75 0 0 1 0 1.06l-2.306 2.306a.75.75 0 1 1-1.06-1.06l1.018-1.018H11.16a3.75 3.75 0 0 1-2.873-1.34l-1.787-2.13z"/></svg>`,
    previous: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"/></svg>`,
    play: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"/></svg>`,
    pause: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"/></svg>`,
    next: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"/></svg>`,
    repeat: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a.75.75 0 0 1-1.5 0v-5A2.25 2.25 0 0 0 12.25 2.5h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/><path d="M12.25 2.5a2.25 2.25 0 0 1 2.25 2.25v5a2.25 2.25 0 0 1-2.25 2.25h-8.5A2.25 2.25 0 0 1 1.5 9.75v-5A2.25 2.25 0 0 1 3.75 2.5h8.5zM0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5A2.25 2.25 0 0 0 12.25 2.5h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z"/></svg>`,
    volume: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.683 3.282V2.868L2.817 6.15z"/><path d="M11.5 4.75a.75.75 0 0 1 .75-.75 4.75 4.75 0 0 1 0 8h-.75a.75.75 0 0 1 0-1.5h.75a3.25 3.25 0 0 0 0-5.5.75.75 0 0 1-.75-.75z"/><path d="M11.5 8a.75.75 0 0 1 .75-.75 1.75 1.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75z"/></svg>`,
    volumeMute: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"/><path d="M10.116.85a.75.75 0 0 0-.75 0L2.44 4.85a2.25 2.25 0 0 0-.825 3.07c.18.306.43.568.725.775l6.925 4a.75.75 0 0 0 1.125-.65v-13a.75.75 0 0 0-.375-.65zM3.5 8a.75.75 0 0 1 .375-.65l5.741-3.316v7.932L3.875 8.65A.75.75 0 0 1 3.5 8z"/></svg>`,
    queue: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z"/></svg>`,
    devices: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6 2.75C6 1.784 6.784 1 7.75 1h6.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 14.25 15h-6.5A1.75 1.75 0 0 1 6 13.25V2.75zm1.75-.25a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h6.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25h-6.5zm-6 0a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25H4V11H1.75A1.75 1.75 0 0 1 0 9.25v-6.5C0 1.784.784 1 1.75 1H4v1.5H1.75zM4 15H1.75A1.75 1.75 0 0 1 0 13.25V12h4v1.5H1.75a.25.25 0 0 0-.25.25V14c0 .138.112.25.25.25H4V15z"/></svg>`,
    fullscreen: `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0z"/></svg>`,
};

// Player state
interface PlayerState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    isShuffle: boolean;
    repeatMode: 'off' | 'all' | 'one';
    currentTrack: {
        title: string;
        artist: string;
        album: string;
        coverUrl: string;
    } | null;
}

let playerState: PlayerState = {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 100,
    isMuted: false,
    isShuffle: false,
    repeatMode: 'off',
    currentTrack: null,
};

// Callbacks
let onPlayPause: (() => void) | null = null;
let onNext: (() => void) | null = null;
let onPrevious: (() => void) | null = null;
let onSeek: ((time: number) => void) | null = null;
let onVolumeChange: ((volume: number) => void) | null = null;

export const setPlayerCallbacks = (callbacks: {
    onPlayPause?: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    onSeek?: (time: number) => void;
    onVolumeChange?: (volume: number) => void;
}) => {
    onPlayPause = callbacks.onPlayPause || null;
    onNext = callbacks.onNext || null;
    onPrevious = callbacks.onPrevious || null;
    onSeek = callbacks.onSeek || null;
    onVolumeChange = callbacks.onVolumeChange || null;
};

export const updatePlayerState = (newState: Partial<PlayerState>) => {
    playerState = { ...playerState, ...newState };
    updatePlayerUI();
};

const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const updatePlayerUI = () => {
    // Update play/pause button
    const playPauseBtn = document.getElementById('player-play-pause');
    if (playPauseBtn) {
        playPauseBtn.innerHTML = playerState.isPlaying ? icons.pause : icons.play;
    }

    // Update progress bar
    const progressBar = document.getElementById('player-progress') as HTMLInputElement;
    if (progressBar && playerState.duration > 0) {
        progressBar.value = String((playerState.currentTime / playerState.duration) * 100);
    }

    // Update time display
    const currentTimeEl = document.getElementById('player-current-time');
    const durationEl = document.getElementById('player-duration');
    if (currentTimeEl) currentTimeEl.textContent = formatTime(playerState.currentTime);
    if (durationEl) durationEl.textContent = formatTime(playerState.duration);

    // Update track info
    if (playerState.currentTrack) {
        const titleEl = document.getElementById('player-track-title');
        const artistEl = document.getElementById('player-track-artist');
        const coverEl = document.getElementById('player-track-cover') as HTMLImageElement;

        if (titleEl) titleEl.textContent = playerState.currentTrack.title;
        if (artistEl) artistEl.textContent = playerState.currentTrack.artist;
        if (coverEl) coverEl.src = playerState.currentTrack.coverUrl;
    }

    // Update volume
    const volumeBar = document.getElementById('player-volume') as HTMLInputElement;
    if (volumeBar) {
        volumeBar.value = String(playerState.isMuted ? 0 : playerState.volume);
    }

    // Update volume icon
    const volumeBtn = document.getElementById('player-volume-btn');
    if (volumeBtn) {
        volumeBtn.innerHTML = playerState.isMuted || playerState.volume === 0 ? icons.volumeMute : icons.volume;
    }
};

export const Footer = (): HTMLElement => {
    const footer = document.createElement("footer");
    footer.id = "player-bar";
    footer.className = "player-bar";

    // ========== LEFT SECTION - Now Playing ==========
    const leftSection = document.createElement("div");
    leftSection.className = "player-section player-left";

    const nowPlaying = document.createElement("div");
    nowPlaying.className = "now-playing";

    const trackCover = document.createElement("img");
    trackCover.id = "player-track-cover";
    trackCover.className = "track-cover";
    trackCover.src = ""; // Placeholder
    trackCover.alt = "Album cover";

    const trackInfo = document.createElement("div");
    trackInfo.className = "track-info";

    const trackTitle = document.createElement("span");
    trackTitle.id = "player-track-title";
    trackTitle.className = "track-title";
    trackTitle.textContent = "No track playing";

    const trackArtist = document.createElement("span");
    trackArtist.id = "player-track-artist";
    trackArtist.className = "track-artist";
    trackArtist.textContent = "";

    trackInfo.appendChild(trackTitle);
    trackInfo.appendChild(trackArtist);
    nowPlaying.appendChild(trackCover);
    nowPlaying.appendChild(trackInfo);
    leftSection.appendChild(nowPlaying);

    // ========== CENTER SECTION - Controls ==========
    const centerSection = document.createElement("div");
    centerSection.className = "player-section player-center";

    // Control buttons
    const controls = document.createElement("div");
    controls.className = "player-controls";

    // Shuffle button
    const shuffleBtn = document.createElement("button");
    shuffleBtn.className = "control-btn control-btn-small";
    shuffleBtn.innerHTML = icons.shuffle;
    shuffleBtn.addEventListener("click", () => {
        playerState.isShuffle = !playerState.isShuffle;
        shuffleBtn.classList.toggle("active", playerState.isShuffle);
    });

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.className = "control-btn control-btn-small";
    prevBtn.innerHTML = icons.previous;
    prevBtn.addEventListener("click", () => onPrevious?.());

    // Play/Pause button
    const playPauseBtn = document.createElement("button");
    playPauseBtn.id = "player-play-pause";
    playPauseBtn.className = "control-btn control-btn-play";
    playPauseBtn.innerHTML = icons.play;
    playPauseBtn.addEventListener("click", () => {
        playerState.isPlaying = !playerState.isPlaying;
        updatePlayerUI();
        onPlayPause?.();
    });

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "control-btn control-btn-small";
    nextBtn.innerHTML = icons.next;
    nextBtn.addEventListener("click", () => onNext?.());

    // Repeat button
    const repeatBtn = document.createElement("button");
    repeatBtn.className = "control-btn control-btn-small";
    repeatBtn.innerHTML = icons.repeat;
    repeatBtn.addEventListener("click", () => {
        const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
        const currentIndex = modes.indexOf(playerState.repeatMode);
        playerState.repeatMode = modes[(currentIndex + 1) % 3];
        repeatBtn.classList.toggle("active", playerState.repeatMode !== 'off');
    });

    controls.appendChild(shuffleBtn);
    controls.appendChild(prevBtn);
    controls.appendChild(playPauseBtn);
    controls.appendChild(nextBtn);
    controls.appendChild(repeatBtn);

    // Progress bar
    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";

    const currentTime = document.createElement("span");
    currentTime.id = "player-current-time";
    currentTime.className = "time-display";
    currentTime.textContent = "0:00";

    const progressBar = document.createElement("input");
    progressBar.type = "range";
    progressBar.id = "player-progress";
    progressBar.className = "progress-bar";
    progressBar.min = "0";
    progressBar.max = "100";
    progressBar.value = "0";
    progressBar.addEventListener("input", (e) => {
        const value = Number((e.target as HTMLInputElement).value);
        const seekTime = (value / 100) * playerState.duration;
        onSeek?.(seekTime);
    });

    const duration = document.createElement("span");
    duration.id = "player-duration";
    duration.className = "time-display";
    duration.textContent = "0:00";

    progressContainer.appendChild(currentTime);
    progressContainer.appendChild(progressBar);
    progressContainer.appendChild(duration);

    centerSection.appendChild(controls);
    centerSection.appendChild(progressContainer);

    // ========== RIGHT SECTION - Volume & Options ==========
    const rightSection = document.createElement("div");
    rightSection.className = "player-section player-right";

    // Queue button
    const queueBtn = document.createElement("button");
    queueBtn.className = "control-btn control-btn-extra";
    queueBtn.innerHTML = icons.queue;

    // Devices button
    const devicesBtn = document.createElement("button");
    devicesBtn.className = "control-btn control-btn-extra";
    devicesBtn.innerHTML = icons.devices;

    // Volume control
    const volumeContainer = document.createElement("div");
    volumeContainer.className = "volume-container";

    const volumeBtn = document.createElement("button");
    volumeBtn.id = "player-volume-btn";
    volumeBtn.className = "control-btn control-btn-extra";
    volumeBtn.innerHTML = icons.volume;
    volumeBtn.addEventListener("click", () => {
        playerState.isMuted = !playerState.isMuted;
        updatePlayerUI();
    });

    const volumeBar = document.createElement("input");
    volumeBar.type = "range";
    volumeBar.id = "player-volume";
    volumeBar.className = "volume-bar";
    volumeBar.min = "0";
    volumeBar.max = "100";
    volumeBar.value = "100";
    volumeBar.addEventListener("input", (e) => {
        const value = Number((e.target as HTMLInputElement).value);
        playerState.volume = value;
        playerState.isMuted = value === 0;
        updatePlayerUI();
        onVolumeChange?.(value);
    });

    volumeContainer.appendChild(volumeBtn);
    volumeContainer.appendChild(volumeBar);

    // Fullscreen button
    const fullscreenBtn = document.createElement("button");
    fullscreenBtn.className = "control-btn control-btn-extra";
    fullscreenBtn.innerHTML = icons.fullscreen;

    rightSection.appendChild(queueBtn);
    rightSection.appendChild(devicesBtn);
    rightSection.appendChild(volumeContainer);
    rightSection.appendChild(fullscreenBtn);

    // Assemble footer
    footer.appendChild(leftSection);
    footer.appendChild(centerSection);
    footer.appendChild(rightSection);

    return footer;
};
