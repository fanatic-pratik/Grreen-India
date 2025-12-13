# app/detect.py

import os
import traceback
from typing import List, Dict

USE_REAL = os.environ.get("USE_REAL_MODEL", "false").lower() in ("1", "true", "yes")
MODEL_PATH = os.environ.get("MODEL_PATH", "yolov8n.pt")

_model = None


def _load_model():
    global _model
    if _model is not None:
        return _model

    from ultralytics import YOLO
    print("🔥 Loading YOLO model from:", MODEL_PATH)

    _model = YOLO(MODEL_PATH)
    return _model


def run_detection_stub(image_path: str) -> List[Dict]:
    return [{
        "label": "unknown_item",
        "confidence": 0.50,
        "bbox": [0, 0, 0, 0],
        "meta": {"mode": "stub"}
    }]


def run_detection_yolo(image_path: str) -> List[Dict]:
    model = _load_model()
    print("🟢 Running YOLO on:", image_path)

    results = model(image_path)
    detections = []

    for res in results:
        if res.boxes is None:
            continue

        for box in res.boxes:
            cls = int(box.cls)
            label = model.names[cls]
            confidence = float(box.conf)
            x1, y1, x2, y2 = map(int, box.xyxy[0].tolist())

            detections.append({
                "label": label,
                "confidence": confidence,
                "bbox": [x1, y1, x2, y2]
            })

    return detections


def run_detection(image_path: str) -> List[Dict]:
    print("USE_REAL_MODEL =", USE_REAL)

    if not USE_REAL:
        return run_detection_stub(image_path)

    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    try:
        return run_detection_yolo(image_path)
    except Exception as e:
        print("❌ YOLO FAILED:", e)
        traceback.print_exc()
        return run_detection_stub(image_path)
