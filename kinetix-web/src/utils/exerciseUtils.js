/**
 * Calculates the angle between three points (a, b, c).
 * b is the vertex.
 * Returns angle in degrees.
 */
export const calculateAngle = (a, b, c) => {
    if (!a || !b || !c) return 0;

    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);

    if (angle > 180.0) {
        angle = 360 - angle;
    }

    return angle;
};

/**
 * Calculates Euclidean distance between two points.
 */
export const calculateDistance = (a, b) => {
    if (!a || !b) return 0;
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

/**
 * Returns a color on a gradient based on progress (0.0 - 1.0) using warm elegant tones.
 */
export const getRepProgressColor = (progress) => {
    // Clamp progress between 0 and 1
    const p = Math.max(0, Math.min(1, progress));

    // Start: Gray/Muted (107, 114, 128)
    // End: Warm Orange/Coral (234, 88, 12)

    const r = Math.round(107 + (234 - 107) * p);
    const g = Math.round(114 + (88 - 114) * p);
    const b = Math.round(128 + (12 - 128) * p);

    return `rgb(${r}, ${g}, ${b})`;
};

export class ExerciseCounter {
    constructor(exerciseName) {
        this.exerciseName = exerciseName;
        this.count = 0;
        this.mode = 'UP'; // UP (eccentric/start) or DOWN (concentric/contracted)
        this.stage = 'START'; // START, ECCENTRIC, CONCENTRIC
        this.feedback = "Get Ready";
        this.progress = 0; // 0.0 to 1.0
        this.confidence = 0;
    }

    setFeedback(msg) {
        this.feedback = msg;
    }

    reset() {
        this.count = 0;
        this.mode = 'UP';
        this.stage = 'START';
        this.feedback = "Get Ready";
        this.progress = 0;
    }
}
