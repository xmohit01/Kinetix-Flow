# 🏋️‍♂️ Kinetix-Flow: AI-Powered Fitness Tracker

**Kinetix-Flow** is a next-generation, AI-driven mobile fitness application designed to act as your personal virtual trainer. By leveraging advanced computer vision and machine learning directly on your device, Kinetix-Flow analyzes your body mechanics, tracks your movement flow, and ensures your workout form is precise, safe, and effective. 

Whether you are performing squats, push-ups, or yoga, this application provides real-time feedback to help you optimize your routine and prevent injuries.

---

## 🚀 Key Features

* **Real-Time Pose Estimation:** Utilizes state-of-the-art AI to instantly map and track key body joints and skeletal structures through your device's camera.
* **Intelligent Form Analysis:** Monitors the accuracy and flow of your exercises, providing visual cues to correct your posture during workouts.
* **Automated Repetition Counting:** Seamlessly counts your reps based on complete ranges of motion, so you can focus purely on your workout rather than keeping track of numbers.
* **100% Privacy-Focused (On-Device Processing):** Security is a priority. All AI computations and camera feeds are processed locally on your smartphone. **No video data is ever recorded, stored, or uploaded to the cloud.**
* **Mobile-First Responsive UI:** Engineered with a clean, modern interface that adapts perfectly to mobile screens, ensuring a seamless user experience whether you are in the gym or at home.

---

## 🛠️ Technology Stack

This application is built using a modern, scalable web-to-mobile architecture:

**Frontend & UI**
* **React.js:** For building a dynamic and component-driven user interface.
* **Tailwind CSS:** For highly customizable, responsive, and utility-first styling.
* **Vite:** For lightning-fast local development and optimized production builds.

**AI & Computer Vision**
* **Google MediaPipe:** The core engine powering the high-fidelity, real-time machine learning models for pose detection.

**Mobile Packaging**
* **Capacitor (by Ionic):** Bridges the web application to native device capabilities, allowing the React codebase to be packaged and deployed as a standalone Android APK.

---

## ⚙️ How It Works Under the Hood

1. **Video Capture:** The app requests native camera permissions and renders the live feed onto an HTML5 `<video>` element.
2. **AI Processing:** Frames are continuously fed into the MediaPipe Pose model, which predicts 33 3D landmarks of the human body.
3. **Data Rendering:** An HTML5 `<canvas>` overlays the video, actively drawing the skeletal wireframe connecting the detected landmarks.
4. **Logic Evaluation:** Custom algorithms calculate angles between specific joints (e.g., knee, hip, and shoulder) to determine exercise states and count repetitions.

---

## 💻 Local Development & Installation

Want to run this project on your local machine or build it for your device? Follow these steps:

### Prerequisites
* Node.js installed on your system.
* Android Studio (if you wish to build the Android APK).

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/Kinetix-Flow.git](https://github.com/your-username/Kinetix-Flow.git)
   cd Kinetix-Flow