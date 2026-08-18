from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import os

output_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

options = Options()
options.add_argument("--headless=new")
options.add_argument("--window-size=390,844") # Mobile viewport
options.add_argument("user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1")

driver = webdriver.Chrome(options=options)

print("Navigating to local built frontend or live app in mobile view...")
driver.get("http://localhost:5173")
time.sleep(3)

driver.save_screenshot(os.path.join(output_dir, "mobile_view_bestsellers_newarrivals.png"))
print("Saved mobile preview screenshot to mobile_view_bestsellers_newarrivals.png")

driver.quit()
