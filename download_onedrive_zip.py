from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import os

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"
download_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\onedrive_zip_download"
os.makedirs(download_dir, exist_ok=True)

print("=== AUTOMATED ZIP DOWNLOAD OF ENTIRE ONEDRIVE FOLDER ===")

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
print("Waiting for page load...")
time.sleep(8)

try:
    # Look for top bar Download button: button with title/aria-label/text containing 'Download'
    download_btn = driver.find_elements(By.XPATH, "//button[contains(@aria-label, 'Download') or contains(@title, 'Download') or contains(., 'Download')]")
    if download_btn:
        print(f"Found {len(download_btn)} Download buttons. Clicking primary Download button...")
        download_btn[0].click()
        print("Clicked Download button! Waiting for ZIP download to complete (30s)...")
        time.sleep(30)
        
        files = os.listdir(download_dir)
        print("Files in download directory:", files)
    else:
        print("Download button not found directly on page.")
        driver.save_screenshot(os.path.join(download_dir, "page_debug.png"))

except Exception as e:
    print("Error during ZIP download:", e)

driver.quit()
