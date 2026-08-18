import os

p = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\trace_full_cart_checkout_flow.py"
if os.path.exists(p):
    os.remove(p)

print("Cleaned up trace_full_cart_checkout_flow.py")
