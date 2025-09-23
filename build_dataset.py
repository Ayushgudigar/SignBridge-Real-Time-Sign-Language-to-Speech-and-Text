# build_dataset.py
"""
Build dataset (npz) from JSON landmark clips.
Saves: isl_dataset.npz with X (float32) and y (int labels) and label_encoder.pkl
"""

import os, glob, json
import numpy as np
from sklearn.preprocessing import LabelEncoder
import joblib
from tqdm import tqdm
from scipy.interpolate import interp1d

SEQ_LENGTH = 30
ROOT_DIRS = ["recordings", "uploads"]  # search these for JSONs

def load_clip(path):
    j = json.load(open(path))
    frames = j.get("frames", [])
    feats = [f["feat"] for f in frames if "feat" in f]
    return np.array(feats, dtype=np.float32)

def resample_seq(arr, T=SEQ_LENGTH):
    if arr.shape[0] == 0:
        return np.zeros((T, arr.shape[1] if arr.ndim>1 else 1), dtype=np.float32)
    if arr.shape[0] == T:
        return arr
    # linear interpolation along time axis for each feature
    old_idx = np.linspace(0, 1, arr.shape[0])
    new_idx = np.linspace(0, 1, T)
    f = interp1d(old_idx, arr, axis=0, kind='linear', fill_value="extrapolate")
    return f(new_idx).astype(np.float32)

def gather_files():
    files = []
    for root in ROOT_DIRS:
        if not os.path.exists(root):
            continue
        for lbl in os.listdir(root):
            lbl_dir = os.path.join(root, lbl)
            if not os.path.isdir(lbl_dir):
                continue
            for j in glob.glob(os.path.join(lbl_dir, "*.json")):
                files.append((lbl, j))
    return files

if __name__ == "__main__":
    files = gather_files()
    print(f"Found {len(files)} clips.")
    X_list, y_list = [], []
    labels = []
    for label, path in tqdm(files):
        feats = load_clip(path)
        if feats is None or feats.size == 0:
            continue
        seq = resample_seq(feats, SEQ_LENGTH)
        X_list.append(seq)
        y_list.append(label)
        labels.append(label)

    if len(X_list) == 0:
        print("No clips found. Exiting.")
        exit(1)

    X = np.stack(X_list)  # N x T x D
    le = LabelEncoder()
    y_enc = le.fit_transform(y_list)
    joblib.dump(le, "label_encoder.pkl")
    np.savez_compressed("isl_dataset.npz", X=X.astype(np.float32), y=np.array(y_enc, dtype=np.int32))
    print("Saved isl_dataset.npz  X:", X.shape, "labels:", len(le.classes_))