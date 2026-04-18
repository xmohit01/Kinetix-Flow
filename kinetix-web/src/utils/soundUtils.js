/**
 * Plays a success beep sound using the Web Audio API.
 * Synthesized to avoid external asset dependencies.
 */
export const playSuccessSound = () => {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // Sound configuration: High pitch ping
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
        oscillator.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); // A6

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
        console.error("Audio playback failed", e);
    }
};
