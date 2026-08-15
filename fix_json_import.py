import os
import json

# Fix import json in organize_and_copy_all_perfume_images.py first
with open("organize_and_copy_all_perfume_images.py", "r", encoding="utf-8") as f:
    py_code = f.read()

if "import json" not in py_code:
    py_code = "import json\n" + py_code
    with open("organize_and_copy_all_perfume_images.py", "w", encoding="utf-8") as f:
        f.write(py_code)

print("SUCCESS: Added import json")
