from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"

print("=== LAUNCHING SELENIUM CHROME/EDGE TO INSPECT ONEDRIVE FOLDER ===")

options = Options()
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")

try:
    driver = webdriver.Chrome(options=options)
    print("Navigating to OneDrive link...")
    driver.get(url)
    time.sleep(8)
    
    print("Page Title:", driver.title)
    
    # Save preview screenshot
    driver.save_screenshot("onedrive_selenium_preview.png")
    print("Saved preview screenshot to onedrive_selenium_preview.png")
    
    # Find all elements or text on page
    elements = driver.find_elements(By.XPATH, "//*[contains(text(), '50') or contains(text(), '0809') or contains(text(), 'Calantha') or contains(text(), 'Herrlich') or contains(text(), 'Midnight') or contains(text(), 'Mirai') or contains(text(), 'Personna') or contains(text(), 'Rich') or contains(text(), 'Seductive') or contains(text(), 'White')]")
    print(f"\nFound {len(elements)} matching text elements:")
    for el in elements[:50]:
        t = el.text.strip()
        if t:
            print("  • Found:", t)
            
    driver.quit()

except Exception as e:
    print("Selenium Error:", e)
