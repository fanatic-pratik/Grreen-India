import os

IMAGE_DIR = "images/train"
LABEL_DIR = "labels/train"

image_exts = [".jpg", ".jpeg", ".png"]

deleted_images = 0
deleted_labels = 0

for label_file in os.listdir(LABEL_DIR):
    label_path = os.path.join(LABEL_DIR, label_file)

    # Skip non-txt
    if not label_file.endswith(".txt"):
        continue

    # If label file is empty → remove label + image
    if os.path.getsize(label_path) == 0:
        os.remove(label_path)
        deleted_labels += 1

        base_name = os.path.splitext(label_file)[0]

        for ext in image_exts:
            img_path = os.path.join(IMAGE_DIR, base_name + ext)
            if os.path.exists(img_path):
                os.remove(img_path)
                deleted_images += 1
                break

print("✅ Cleanup completed")
print(f"🗑 Deleted empty labels: {deleted_labels}")
print(f"🗑 Deleted corresponding images: {deleted_images}")
