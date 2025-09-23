# uploader_server.py
"""
Simple Flask server to accept landmark clip uploads (JSON).
POST /upload  with JSON body { "label": "...", "frames": [...], "meta": {...} }
"""

from flask import Flask, request, jsonify
import os, json, datetime

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload():
    if not request.is_json:
        return jsonify({"ok": False, "error": "expected JSON"}), 400
    payload = request.get_json()
    label = payload.get("label", "unknown")
    label_dir = os.path.join(UPLOAD_DIR, label)
    os.makedirs(label_dir, exist_ok=True)
    ts = datetime.datetime.utcnow().strftime("%Y%m%d_%H%M%S_%f")
    fname = os.path.join(label_dir, f"{label}_{ts}.json")
    with open(fname, "w") as f:
        json.dump(payload, f)
    return jsonify({"ok": True, "saved": fname})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)