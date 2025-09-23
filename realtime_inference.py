# realtime_inference.py
"""
Realtime inference using webcam. Uses MediaPipe Holistic to extract features and the trained Keras model.
"""

import cv2, numpy as np, mediapipe as mp, joblib, time
from collections import deque
import tensorflow as tf

SEQ_LENGTH = 30
MODEL_PATH = "isl_lstm.h5"

model = tf.keras.models.load_model(MODEL_PATH)
le = joblib.load("label_encoder.pkl")  # from build_dataset.py

mp_holistic = mp.solutions.holistic
mp_drawing = mp.solutions.drawing_utils

def landmarks_to_list(results):
    def lm_list(landmark, n):
        if landmark:
            return [coord for lm in landmark.landmark for coord in (lm.x, lm.y, lm.z)]
        else:
            return [0.0] * n
    lh = lm_list(results.left_hand_landmarks, 21*3)
    rh = lm_list(results.right_hand_landmarks, 21*3)
    pose = lm_list(results.pose_landmarks, 33*3)
    face = lm_list(results.face_landmarks, 468*3)
    return np.array(lh + rh + pose + face, dtype=np.float32)

cap = cv2.VideoCapture(0)
seq = deque(maxlen=SEQ_LENGTH)

with mp_holistic.Holistic(static_image_mode=False, model_complexity=1, refine_face_landmarks=True) as holistic:
    last_output_time = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = holistic.process(frame_rgb)

        # draw for debug
        mp_drawing.draw_landmarks(frame, results.left_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
        mp_drawing.draw_landmarks(frame, results.right_hand_landmarks, mp.solutions.hands.HAND_CONNECTIONS)
        mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp.solutions.pose.POSE_CONNECTIONS)
        if results.face_landmarks:
            mp_drawing.draw_landmarks(frame, results.face_landmarks, mp.solutions.face_mesh.FACEMESH_TESSELATION)

        feat = landmarks_to_list(results)
        seq.append(feat)

        if len(seq) == SEQ_LENGTH:
            arr = np.expand_dims(np.array(seq), axis=0)  # 1 x T x D
            pred = model.predict(arr, verbose=0)[0]
            idx = np.argmax(pred)
            conf = float(pred[idx])
            label = le.inverse_transform([idx])[0]
            # simple smoothing: show only if confidence high or at least 0.5 secs since last shown
            now = time.time()
            if conf > 0.70 and now - last_output_time > 0.4:
                last_output_time = now
                cv2.putText(frame, f"{label} ({conf:.2f})", (10,40), cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0,255,0), 3)
        cv2.imshow("ISL Live", frame)
        if cv2.waitKey(1) & 0xFF == 27:
            break

cap.release()
cv2.destroyAllWindows()