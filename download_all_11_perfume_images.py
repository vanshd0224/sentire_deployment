from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
import os
import urllib.request
import re

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"
dest_base = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\downloaded_50ml"
os.makedirs(dest_base, exist_ok=True)

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

# Configure download folder for selenium
prefs = {"download.default_directory": dest_base}
options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(options=options)
driver.get(url)
time.sleep(8)

folders_map = [
    ("0809", "0809 ready"),
    ("calantha", "CALANTHA READY"),
    ("deep-crush", "DEEP CRUSH READY"),
    ("herrlich", "HERRLICH READY"),
    ("midnight", "MIDNIGHT READY"),
    ("mirai", "MIRAI READY"),
    ("personna", "PERSONNA"),
    ("purple-oud", "PURPLE OUD READY"),
    ("rich", "RICH READY"),
    ("seductive", "SEDUCTIVE READY"),
    ("white-oud", "WHITE OUD READY")
]

print("=== AUTOMATED EXTRACT OF ALL 11 PERFUME FOLDERS ===")

for p_key, folder_name in folders_map:
    print(f"\nProcessing {p_key.upper()} ('{folder_name}')...")
    p_dir = os.path.join(dest_base, p_key)
    os.makedirs(p_dir, exist_ok=True)
    
    try:
        # Locate row by folder name
        row_xpath = f"//div[@role='row' and .//span[contains(text(), '{folder_name}')]]"
        rows = driver.find_elements(By.XPATH, row_xpath)
        if not rows:
            row_xpath = f"//*[contains(text(), '{folder_name}')]"
            rows = driver.find_elements(By.XPATH, row_xpath)
            
        if rows:
            print(f"Clicking folder '{folder_name}'...")
            ActionChains(driver).double_click(rows[0]).perform()
            time.sleep(6)
            
            curr_url = driver.current_url
            print(f"Inside folder URL: {curr_url}")
            
            # Find images or files inside
            img_elements = driver.find_elements(By.TAG_NAME, "img")
            img_urls = []
            for img in img_elements:
                src = img.get_attribute("src") or ""
                if "thumbnail" in src or "Download" in src or "Transform" in src or "storage.live.com" in src or "1drv" in src:
                    img_urls.append(src)
                    
            print(f"Found {len(img_urls)} candidate image URLs inside {p_key.upper()}")
            
            # Navigate back to root folder
            driver.get(url)
            time.sleep(5)
        else:
            print(f"Could not find row for {folder_name}")
    except Exception as e:
        print(f"Error processing {folder_name}: {e}")
        driver.get(url)
        time.sleep(5)

driver.quit()
print("=== FINISHED EXTRACTION ATTEMPT ===")
