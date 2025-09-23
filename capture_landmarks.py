# capture_landmarks.py
"""
Capture webcam, extract MediaPipe Holistic landmarks per frame and save as JSON clip.
Usage:
    python capture_landmarks.py --label hello --duration 1.5 --out recordings
"""

import cv2, json, time, os, argparse
import mediapipe as mp
import numpy as np
from datetime import datetime

mp_holistic = mp.solutions.holistic

# configuration
DEFAULT_FPS = 30

def landmarks_to_list(results):
    # returns concatenated flattened landmarks: lh(21*3) + rh(21*3) + pose(33*3) + face(468*3)
    def lm_list(landmark, n):
        if landmark:
            return [coord for lm in landmark.landmark for coord in (lm.x, lm.y, lm.z)]
        else:
            return [0.0] * n
    lh = lm_list(results.left_hand_landmarks, 21*3)
    rh = lm_list(results.right_hand_landmarks, 21*3)
    pose = lm_list(results.pose_landmarks, 33*3)
    face = lm_list(results.face_landmarks, 468*3)
    return lh + rh + pose + face

def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path, exist_ok=True)

def record(label, duration=2.0, out_dir="recordings", show_preview=True):
    ensure_dir(out_dir)
    label_dir = os.path.join(out_dir, label)
    ensure_dir(label_dir)

    cap = cv2.VideoCapture(0)
    # try to set camera fps; not guaranteed
    cap.set(cv2.CAP_PROP_FPS, DEFAULT_FPS)

    with mp_holistic.Holistic(static_image_mode=False, model_complexity=1, refine_face_landmarks=True) as holistic:
        start = time.time()
        frames = []
        while time.time() - start < duration:
            ret, frame = cap.read()
            if not ret:
                break
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            results = holistic.process(frame_rgb)

            feat = landmarks_to_list(results)
            frames.append({"t": time.time(), "feat": feat})

            if show_preview:
                # draw landmarks for preview
                mp.solutions.drawing_utils.draw_landmarks(frame, results.left_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
                mp.solutions.drawing_utils.draw_landmarks(frame, results.right_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
                mp.solutions.drawing_utils.draw_landmarks(frame, results.pose_landmarks, mp.solutions.pose.POSE_CONNECTIONS)
                mp.solutions.drawing_utils.draw_landmarks(frame, results.face_landmarks, mp.solutions.face_mesh.FACEMESH_TESSELATION)
                cv2.putText(frame, f"Label: {label}", (10,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2)
                cv2.imshow("Capture", frame)
                if cv2.waitKey(1) & 0xFF == 27:
                    break

    cap.release()
    if show_preview:
        cv2.destroyAllWindows()

    if len(frames) < 2:
        print("Too few frames, not saving.")
        return None

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    fname = os.path.join(label_dir, f"{label}_{timestamp}.json")
    payload = {
        "label": label,
        "timestamp": timestamp,
        "n_frames": len(frames),
        "frames": frames
    }
    with open(fname, "w") as f:
        json.dump(payload, f)
    print("Saved", fname)
    return fname

if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--label", required=True)
    p.add_argument("--duration", default=1.5, type=float)
    p.add_argument("--out", default="recordings")
    p.add_argument("--preview", action="store_true")
    args = p.parse_args()
    record(args.label, args.duration, args.out, args.preview)