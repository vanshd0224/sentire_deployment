import os

src_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\src"
app_path = os.path.join(src_dir, "App.tsx")

with open(app_path, "r", encoding="utf-8") as f:
    app_code = f.read()

pos = app_code.find("return (")
with open("render_block.txt", "w", encoding="utf-8") as f_out:
    f_out.write(app_code[pos:])

print("Written to render_block.txt successfully!")
