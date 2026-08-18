import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_dom_tests.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_trace_script.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\verify_mobile_layout.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\mobile_view_bestsellers_newarrivals.png"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up temporary mobile test scripts!")
