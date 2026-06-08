"use client";

type SoundType = 'click' | 'hover' | 'transition' | 'success';

let audioContext: AudioContext | null = null;

const soundSettings = {
    enabled: true,
    volume: 0.1
};

export const playSound = (type: SoundType) => {
    if (typeof window === 'undefined' || !soundSettings.enabled) return;

    if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(soundSettings.volume, audioContext.currentTime);
    masterGain.connect(audioContext.destination);

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.connect(gain);
    gain.connect(masterGain);

    const now = audioContext.currentTime;

    switch (type) {
        case 'click':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
            gain.gain.setValueAtTime(0.5, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
            break;

        case 'hover':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1200, now);
            osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
            break;

        case 'transition':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(200, now);
            osc.frequency.exponentialRampToValueAtTime(400, now + 0.3);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
            break;

        case 'success':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.2);
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.5, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
            break;
    }
};

export const toggleSounds = (enabled: boolean) => {
    soundSettings.enabled = enabled;
};
