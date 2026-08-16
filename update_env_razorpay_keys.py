import os

razorpay_id = "rzp_live_TQPGLDMnqRnQ7U"
razorpay_secret = "1nFrA9P1rkv1Wqrut54viPZK"

# 1. Update backend/.env
backend_env = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\.env"
with open(backend_env, "r", encoding="utf-8") as f:
    be_code = f.read()

lines = be_code.splitlines()
new_lines = []
for line in lines:
    if line.startswith("RAZORPAY_KEY_ID="):
        new_lines.append(f"RAZORPAY_KEY_ID={razorpay_id}")
    elif line.startswith("RAZORPAY_KEY_SECRET="):
        new_lines.append(f"RAZORPAY_KEY_SECRET={razorpay_secret}")
    else:
        new_lines.append(line)

if "RAZORPAY_KEY_ID=" not in be_code:
    new_lines.append(f"RAZORPAY_KEY_ID={razorpay_id}")
if "RAZORPAY_KEY_SECRET=" not in be_code:
    new_lines.append(f"RAZORPAY_KEY_SECRET={razorpay_secret}")

with open(backend_env, "w", encoding="utf-8") as f:
    f.write("\n".join(new_lines))

# 2. Update frontend/.env
frontend_env = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\.env"
with open(frontend_env, "r", encoding="utf-8") as f:
    fe_code = f.read()

fe_lines = fe_code.splitlines()
new_fe_lines = []
for line in fe_lines:
    if line.startswith("VITE_RAZORPAY_KEY_ID="):
        new_fe_lines.append(f"VITE_RAZORPAY_KEY_ID={razorpay_id}")
    else:
        new_fe_lines.append(line)

if "VITE_RAZORPAY_KEY_ID=" not in fe_code:
    new_fe_lines.append(f"VITE_RAZORPAY_KEY_ID={razorpay_id}")

with open(frontend_env, "w", encoding="utf-8") as f:
    f.write("\n".join(new_fe_lines))

print("SUCCESS: Configured live Razorpay Key ID and Secret in backend/.env and frontend/.env!")
