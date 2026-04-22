import { useState, useRef, useEffect, useCallback } from 'react';
import { calculateAngle, calculateDistance } from '../utils/exerciseUtils';

export const useExerciseLogic = (landmarks, activeExercise) => {
    const [stats, setStats] = useState({
        repCount: 0,
        feedback: "Assume Starting Position",
        instruction: "Stand by for tracking",
        progress: 0,
        formQuality: 100,
        timer: 0,
        debugAngle: 0,
        visibilityWarning: null
    });

    const stateRef = useRef({
        count: 0,
        phase: 'IDLE', // IDLE (Calibration), START, PEAK
        frames: 0,
        feedback: "Assume Starting Position",
        instruction: "Stand by",
        progress: 0,
        timerStart: null,
        isHolding: false,
        movementFrames: 0,
        lastAngle: null,
        landmarkHistory: []
    });

    useEffect(() => {
        // Reset state when exercise changes
        stateRef.current = {
            count: 0,
            phase: 'IDLE',
            frames: 0,
            feedback: "Assume Starting Position",
            instruction: getStartingInstruction(activeExercise),
            progress: 0,
            timerStart: null,
            isHolding: false,
            movementFrames: 0,
            lastAngle: null,
            landmarkHistory: []
        };
        setStats({
            repCount: 0,
            feedback: "Assume Starting Position",
            instruction: getStartingInstruction(activeExercise),
            progress: 0,
            formQuality: 100,
            timer: 0,
            debugAngle: 0,
            visibilityWarning: null
        });
    }, [activeExercise]);

    useEffect(() => {
        if (!landmarks) return;

        const s = stateRef.current;

        // --- Smoothing Logic ---
        if (!s.landmarkHistory) s.landmarkHistory = [];
        s.landmarkHistory.push(landmarks);
        if (s.landmarkHistory.length > 5) s.landmarkHistory.shift();

        const smoothedLandmarks = [];
        for (let i = 0; i < 33; i++) {
            let sumX = 0, sumY = 0, sumZ = 0, sumVis = 0;
            s.landmarkHistory.forEach(frame => {
                const lm = frame[i];
                if (lm) {
                    sumX += lm.x;
                    sumY += lm.y;
                    sumZ += lm.z;
                    sumVis += (lm.visibility || 0);
                }
            });
            const count = s.landmarkHistory.length;
            smoothedLandmarks.push({
                x: sumX / count,
                y: sumY / count,
                z: sumZ / count,
                visibility: sumVis / count
            });
        }

        const processingLandmarks = smoothedLandmarks;

        // --- DYNAMIC JOINT DETECTION ---
        const joints = getRequiredJoints(activeExercise, processingLandmarks);
        if (joints.ready) {
            const rawAngle = calculateAngle(joints.p1, joints.p2, joints.p3);
            s.debugAngle = Math.round(rawAngle);
            s.visibilityWarning = null;
        } else {
            s.visibilityWarning = "Body Not Fully Visible";
        }

        // --- DYNAMIC BIO-START (2s Auto-Calibration) ---
        if (s.phase === 'IDLE') {
            // Helper: Detect if user is in starting position with 5° grace
            const startReached = isAtStart(activeExercise, s.debugAngle);

            if (startReached) {
                if (!s.startTimer) s.startTimer = Date.now();
                const heldTime = (Date.now() - s.startTimer) / 1000;

                if (heldTime > 1.5) { // 1.5s lock-in instead of 2s for "forgiving" start
                    s.phase = 'START';
                    s.feedback = "System Locked";
                    s.startTimer = null;
                }
            } else {
                s.startTimer = null;
            }

            // Fallback: Movement-based skip (unchanged but shortened)
            if (s.lastAngle !== null && Math.abs(s.debugAngle - s.lastAngle) > 3) {
                s.movementFrames++;
            } else {
                s.movementFrames = Math.max(0, s.movementFrames - 0.5);
            }
            s.lastAngle = s.debugAngle;

            if (s.movementFrames > 90) { // ~3s fallback
                s.phase = 'START';
                s.feedback = "Manual Override";
            }
        }

        // --- EXERCISE LOGIC ROUTER ---
        switch (activeExercise) {
            case 'Bicep Curls': handleBicepCurl(processingLandmarks, s); break;
            case 'Push-ups': handlePushups(processingLandmarks, s); break;
            case 'Tricep Dips': handleTricepDips(processingLandmarks, s); break;
            case 'Squats': handleSquat(processingLandmarks, s); break;
            case 'Shoulder Press': handleShoulderPress(processingLandmarks, s); break;
            case 'Lateral Raises': handleLateralRaises(processingLandmarks, s); break;
            case 'Crunches': handleCrunches(processingLandmarks, s); break;
            case 'Planks': handlePlank(processingLandmarks, s); break;
            case 'Lats Pulldown': handleLatsPulldown(processingLandmarks, s); break;
            case 'Wrist Curls': handleWristCurl(processingLandmarks, s); break;
            case 'Chest Press': handleChestPress(processingLandmarks, s); break;
            case 'Leg Press': handleLegPress(processingLandmarks, s); break;
            case 'Hip Thrusts': handleHipThrust(processingLandmarks, s); break;
            default: break;
        }

        // Timer calculation
        let currentTimer = 0;
        if (activeExercise === 'Planks' && s.isHolding && s.timerStart) {
            currentTimer = Math.floor((Date.now() - s.timerStart) / 1000);
        }

        // Throttled UI Update
        if (s.count !== stats.repCount || s.feedback !== stats.feedback || currentTimer !== stats.timer || s.visibilityWarning !== stats.visibilityWarning) {
            setStats({
                repCount: s.count,
                feedback: s.feedback,
                instruction: s.instruction,
                progress: s.progress,
                formQuality: 100,
                timer: currentTimer,
                debugAngle: s.debugAngle,
                visibilityWarning: s.visibilityWarning
            });
        }

    }, [landmarks, activeExercise]);

    // --- GLOBAL RESET ---
    const resetSession = useCallback(() => {
        stateRef.current = {
            ...stateRef.current,
            count: 0,
            phase: 'IDLE',
            progress: 0,
            timerStart: null,
            isHolding: false
        };
        setStats(prev => ({ ...prev, repCount: 0, phase: 'IDLE', progress: 0 }));
    }, []);

    return { ...stats, phase: stateRef.current.phase, reset: resetSession };
};

// --- HELPER: STARTING POSITION DETECTOR (5° Grace) ---
const isAtStart = (exercise, angle) => {
    switch (exercise) {
        case 'Bicep Curls':
        case 'Squats':
            return angle > 145; // 150 - 5 grace
        case 'Tricep Dips':
        case 'Push-ups':
            return angle > 155; // 160 - 5 grace
        case 'Wrist Curls':
            return angle > 160; // 165 - 5 grace
        case 'Crunches':
            return angle < 50;  // 45 + 5 grace
        default:
            return angle > 150;
    }
};

// --- HELPER: STARTING INSTRUCTIONS ---
const getStartingInstruction = (exercise) => {
    switch (exercise) {
        case 'Bicep Curls': return "Straighten your arm to begin";
        case 'Squats': return "Stand tall to begin";
        case 'Push-ups':
        case 'Tricep Dips': return "Lock elbows at the top";
        case 'Crunches': return "Lie flat on your back";
        case 'Shoulder Press': return "Hands at ear level";
        case 'Lateral Raises': return "Hands at your sides";
        case 'Planks': return "Assume a flat bridge position";
        case 'Wrist Curls': return "Flatten your hand to begin";
        default: return "Assume starting position";
    }
};

// --- HELPER: REQUIRED JOINTS ---
const getRequiredJoints = (exercise, lm) => {
    switch (exercise) {
        case 'Squats':
        case 'Leg Press':
            return { ready: lm[23] && lm[25] && lm[27], p1: lm[23], p2: lm[25], p3: lm[27] }; // Hip, Knee, Ankle
        case 'Crunches':
        case 'Hip Thrusts':
            return { ready: lm[11] && lm[23] && lm[25], p1: lm[11], p2: lm[23], p3: lm[25] }; // Shoulder, Hip, Knee
        case 'Shoulder Press':
            return { ready: lm[13] && lm[11] && lm[23], p1: lm[13], p2: lm[11], p3: lm[23] }; // Elbow, Shoulder, Hip
        case 'Wrist Curls':
            return { ready: lm[13] && lm[15] && lm[19], p1: lm[13], p2: lm[15], p3: lm[19] }; // Elbow, Wrist, Index Finger
        case 'Bicep Curls':
            return { ready: lm[11] && lm[13] && lm[15], p1: lm[11], p2: lm[13], p3: lm[15] }; // Shoulder, Elbow, Wrist
        default:
            return { ready: lm[11] && lm[13] && lm[15], p1: lm[11], p2: lm[13], p3: lm[15] }; // Default to Elbow/Shoulder/Wrist
    }
};

// --- EXERCISE HANDLERS (REFINED) ---

const handleBicepCurl = (lm, s) => {
    const angle = s.debugAngle; // Vertex at Elbow [13]

    // Joint Stillness Guard: Shoulder [11] should not move significantly vertically
    const shoulderMovement = s.landmarkHistory.length > 1 ? Math.abs(lm[11].y - s.landmarkHistory[s.landmarkHistory.length - 2][11].y) : 0;
    if (shoulderMovement > 0.05) {
        s.feedback = "Keep Shoulder Still";
        return;
    }

    if (s.phase === 'IDLE') {
        if (angle > 150) { s.phase = 'START'; s.feedback = "Curl Up"; }
        return;
    }
    if (s.phase === 'START' && angle < 40) { s.phase = 'PEAK'; s.feedback = "Squeeze!"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle > 150) { s.phase = 'START'; s.count++; s.feedback = "Good Rep!"; s.progress = 0; }
};

const handlePushups = (lm, s) => {
    const angle = s.debugAngle;
    if (s.phase === 'IDLE') {
        if (angle > 160) { s.phase = 'START'; s.feedback = "Lower Down"; }
        return;
    }
    if (s.phase === 'START' && angle < 90) { s.phase = 'PEAK'; s.feedback = "Push Up!"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle > 160) { s.phase = 'START'; s.count++; s.feedback = "Great Form!"; s.progress = 0; }
};

const handleTricepDips = (lm, s) => {
    const angle = s.debugAngle;
    if (s.phase === 'IDLE') {
        if (angle > 160) { s.phase = 'START'; s.feedback = "Lower Body"; }
        return;
    }
    if (s.phase === 'START' && angle < 90) { s.phase = 'PEAK'; s.feedback = "Lock Elbows"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle > 160) { s.phase = 'START'; s.count++; s.feedback = "Triceps Engaged!"; s.progress = 0; }
};

const handleSquat = (lm, s) => {
    const angle = s.debugAngle;
    if (s.phase === 'IDLE') {
        if (angle > 160) { s.phase = 'START'; s.feedback = "Squat Down"; }
        return;
    }
    if (s.phase === 'START' && angle < 90) { s.phase = 'PEAK'; s.feedback = "Drive Up"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle > 160) { s.phase = 'START'; s.count++; s.feedback = "Strong Legs!"; s.progress = 0; }
};

const handleShoulderPress = (lm, s) => {
    const angle = s.debugAngle; // Vertex at Shoulder [11] (Hip-Shoulder-Elbow)
    if (s.phase === 'IDLE') {
        if (angle < 90) { s.phase = 'START'; s.feedback = "Press Up"; }
        return;
    }
    if (s.phase === 'START' && angle > 160) { s.phase = 'PEAK'; s.feedback = "Hold Top"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle < 90) { s.phase = 'START'; s.count++; s.feedback = "Boulder Shoulders!"; s.progress = 0; }
};

const handleLateralRaises = (lm, s) => {
    const angle = s.debugAngle; // Shoulder Angle
    if (s.phase === 'IDLE') {
        if (angle < 40) { s.phase = 'START'; s.feedback = "Raise Arms"; }
        return;
    }
    if (s.phase === 'START' && angle > 80) { s.phase = 'PEAK'; s.feedback = "Hold Level"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle < 40) { s.phase = 'START'; s.count++; s.feedback = "Good Control!"; s.progress = 0; }
};

const handleCrunches = (lm, s) => {
    const angle = s.debugAngle; // Hip Angle
    if (s.phase === 'IDLE') {
        if (angle > 165) { s.phase = 'START'; s.feedback = "Crunch Up"; }
        return;
    }
    if (s.phase === 'START' && angle < 130) { s.phase = 'PEAK'; s.feedback = "Squeeze Core"; s.progress = 1; }
    if (s.phase === 'PEAK' && angle > 165) { s.phase = 'START'; s.count++; s.feedback = "Abs on Fire!"; s.progress = 0; }
};

// ... Remaining handlers simplified for focus ...
const handlePlank = (lm, s) => {
    const isGood = s.debugAngle > 165 && s.debugAngle < 195;
    if (isGood) {
        if (!s.isHolding) { s.isHolding = true; s.timerStart = Date.now(); s.feedback = "Holding Plank"; }
    } else {
        s.isHolding = false; s.timerStart = null; s.feedback = "Align Hips";
    }
};

const handleLatsPulldown = (lm, s) => {
    if (s.phase === 'IDLE' && lm[15].y < lm[0].y) { s.phase = 'START'; s.feedback = "Pull Down"; }
    if (s.phase === 'START' && lm[15].y > lm[0].y) { s.phase = 'PEAK'; s.feedback = "Squeeze Lats"; }
    if (s.phase === 'PEAK' && lm[15].y < lm[0].y) { s.phase = 'START'; s.count++; s.feedback = "Good Pull!"; }
};

const handleWristCurl = (lm, s) => {
    const angle = s.debugAngle; // Vertex at Wrist [15] (Elbow-Wrist-Index)

    // Joint Stillness Guard: Elbow [13] should not move significantly
    const elbowMovement = s.landmarkHistory.length > 1 ? Math.abs(lm[13].y - s.landmarkHistory[s.landmarkHistory.length - 2][13].y) : 0;
    if (elbowMovement > 0.03) {
        s.feedback = "Keep Elbow Still";
        return;
    }

    if (s.phase === 'IDLE') {
        if (angle > 170) {
            s.phase = 'START';
            s.feedback = "Curl Wrist Up";
        }
        return;
    }

    // Progress mapping: 170 (0%) -> 140 (100%)
    s.progress = Math.max(0, Math.min(1, (170 - angle) / (170 - 140)));

    if (s.phase === 'START' && angle < 140) {
        s.phase = 'PEAK';
        s.feedback = "Great Flexion!";
        s.progress = 1;
    }

    if (s.phase === 'PEAK' && angle > 170) {
        s.phase = 'START';
        s.count++;
        s.feedback = "Solid Rep!";
        s.progress = 0;
    }
};

const handleChestPress = (lm, s) => {
    if (s.phase === 'IDLE' && s.debugAngle < 90) { s.phase = 'START'; s.feedback = "Push Forward"; }
    if (s.phase === 'START' && s.debugAngle > 160) { s.phase = 'PEAK'; s.feedback = "Squeeze"; }
    if (s.phase === 'PEAK' && s.debugAngle < 90) { s.phase = 'START'; s.count++; s.feedback = "Good Press!"; }
};

const handleLegPress = (lm, s) => {
    if (s.phase === 'IDLE' && s.debugAngle < 100) { s.phase = 'START'; s.feedback = "Push Out"; }
    if (s.phase === 'START' && s.debugAngle > 160) { s.phase = 'PEAK'; s.feedback = "Extend Legs"; }
    if (s.phase === 'PEAK' && s.debugAngle < 100) { s.phase = 'START'; s.count++; s.feedback = "Strong Push!"; }
};

const handleHipThrust = (lm, s) => {
    if (s.phase === 'IDLE' && s.debugAngle < 120) { s.phase = 'START'; s.feedback = "Bridge Up"; }
    if (s.phase === 'START' && s.debugAngle > 170) { s.phase = 'PEAK'; s.feedback = "Squeeze Glutes"; }
    if (s.phase === 'PEAK' && s.debugAngle < 120) { s.phase = 'START'; s.count++; s.feedback = "Good Bridge!"; }
};
