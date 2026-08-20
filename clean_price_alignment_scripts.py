import os

files = [
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\find_price_font_display.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\price_font_matches.txt",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\find_all_prices.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\all_rupee_matches.txt",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\fix_price_baseline_alignment.py",
    r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\clean_final39.py"
]

for f in files:
    if os.path.exists(f):
        os.remove(f)

print("Cleaned up price alignment scripts!")
