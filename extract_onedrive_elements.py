from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import json

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=options)
driver.get(url)
time.sleep(10)

print("=== EXTRACTING ALL FOLDERS & ITEMS FROM ONEDRIVE PAGE ===")

# Find all clickable row/tile elements
rows = driver.find_elements(By.XPATH, "//div[@role='row'] | //div[contains(@class, 'od-ItemTile')] | //span[contains(@class, 'od-ItemTile-title')] | //button[contains(@class, 'ms-Link')]")

found_items = []
for r in rows:
    txt = r.text.strip()
    if txt and txt not in found_items:
        found_items.append(txt)

print(f"Total items extracted ({len(found_items)}):")
for item in found_items:
    print("  •", item.replace("\n", " | "))

# Check for links or images
imgs = driver.find_elements(By.TAG_NAME, "img")
print(f"\nTotal image elements found: {len(imgs)}")
for img in imgs[:15]:
    src = img.get_attribute("src")
    alt = img.get_attribute("alt")
    print(f"  Img: alt='{alt}' src='{src[:100] if src else ''}'")

driver.quit()
