import os
import random
import shutil

IMAGE_DIR = "images/train"
LABEL_DIR = "labels/train"

VAL_IMAGE_DIR = "images/val"
VAL_LABEL_DIR = "labels/val"

os.makedirs(VAL_IMAGE_DIR, exist_ok=True)
os.makedirs(VAL_LABEL_DIR, exist_ok=True)

images = [f for f in os.listdir(IMAGE_DIR) if f.endswith(('.jpg', '.png', '.jpeg'))]
random.shuffle(images)

val_size = int(0.2 * len(images))
val_images = images[:val_size]

for img in val_images:
    base = os.path.splitext(img)[0]

    shutil.move(os.path.join(IMAGE_DIR, img),
                os.path.join(VAL_IMAGE_DIR, img))

    shutil.move(os.path.join(LABEL_DIR, base + ".txt"),
                os.path.join(VAL_LABEL_DIR, base + ".txt"))

print(f"✅ Split complete: {len(images)-val_size} train, {val_size} val")
