import urllib.request
import re
import json

drive_url = "https://drive.google.com/drive/folders/18vL-hUr5LXlMz4Upb9ploiJEufMJ0-Qg"

print("Fetching Drive page content...")
req = urllib.request.Request(drive_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html_content = response.read().decode('utf-8')

    # Look for image items or file titles in Google Drive initial payload
    file_matches = re.findall(r'\["([^"]+\.(?:png|jpg|jpeg|webp))"', html_content, re.IGNORECASE)
    print(f"Found {len(file_matches)} raw file matches:")
    for f in file_matches[:30]:
        print(" -", f)

except Exception as e:
    print("Error fetching drive:", e)
