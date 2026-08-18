from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import os
import json

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=options)
driver.get(url)
time.sleep(8)

print("=== DEEP INSPECT OF ONEDRIVE FOLDERS & LINKS ===")

rows = driver.find_elements(By.XPATH, "//div[@role='row']")
print(f"Total rows found: {len(rows)}")

folder_names = []
for r in rows:
    txt = r.text.strip()
    lines = [l.strip() for l in txt.split("\n") if l.strip()]
    if lines:
        print("Row:", lines)
        name = lines[0]
        if name != "Name":
            folder_names.append(name)

print("\nExtracted Folder Names List:", folder_names)

driver.quit()
