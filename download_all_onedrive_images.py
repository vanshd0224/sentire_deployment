from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
import time
import os
import urllib.request

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"
output_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\scraped_50ml_images"
os.makedirs(output_dir, exist_ok=True)

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=options)
driver.get(url)
time.sleep(8)

folders_to_find = [
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

print("=== STARTING ONEDRIVE 11 PERFUME AUTOMATED DOWNLOAD ===")

for p_key, folder_name in folders_to_find:
    print(f"\nAccessing Folder for: {p_key.upper()} ('{folder_name}')...")
    perfume_out_dir = os.path.join(output_dir, p_key)
    os.makedirs(perfume_out_dir, exist_ok=True)
    
    try:
        # Find element containing folder name
        folder_elements = driver.find_elements(By.XPATH, f"//*[contains(text(), '{folder_name}')]")
        if folder_elements:
            print(f"Found element for {folder_name}, double clicking...")
            actions = ActionChains(driver)
            actions.double_click(folder_elements[0]).perform()
            time.sleep(5)
            
            # Save preview screenshot
            driver.save_screenshot(os.path.join(output_dir, f"{p_key}_preview.png"))
            
            # Find download links or image tags inside folder
            imgs = driver.find_elements(By.TAG_NAME, "img")
            print(f"Found {len(imgs)} img tags inside {p_key.upper()} folder")
            
            # Navigate back
            driver.get(url)
            time.sleep(5)
        else:
            print(f"Folder element '{folder_name}' not found on root page")
            
    except Exception as e:
        print(f"Error accessing {folder_name}: {e}")
        driver.get(url)
        time.sleep(5)

driver.quit()
print("\n=== FINISHED ACCESSING ALL 11 PERFUMES IN ONEDRIVE ===")
