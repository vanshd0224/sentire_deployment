from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"
download_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\onedrive_zip_download"
os.makedirs(download_dir, exist_ok=True)

print("=== SELECT ALL & DOWNLOAD ONEDRIVE ZIP ===")

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

prefs = {
    "download.default_directory": download_dir,
    "download.prompt_for_download": False,
    "download.directory_upgrade": True,
    "safebrowsing.enabled": True
}
options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(options=options)
driver.get(url)
time.sleep(8)

try:
    # 1. Click body and press Ctrl+A to select all items
    body = driver.find_element(By.TAG_NAME, "body")
    body.send_keys(Keys.CONTROL + "a")
    time.sleep(3)
    
    # 2. Look for any download command bar button
    buttons = driver.find_elements(By.XPATH, "//button[contains(., 'Download') or contains(@aria-label, 'Download')] | //span[contains(text(), 'Download')]")
    print(f"Found {len(buttons)} download buttons after Select All")
    for btn in buttons:
        try:
            print("Clicking button:", btn.text)
            btn.click()
            time.sleep(2)
        except Exception as e:
            print("Click failed:", e)

    print("Waiting 20 seconds for download to start...")
    time.sleep(20)
    
    files = os.listdir(download_dir)
    print("Downloaded files:", files)

except Exception as e:
    print("Error:", e)

driver.quit()
