from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import os
import sys

live_url = "https://ecommerce-frontend-1041917436859.asia-south1.run.app"
output_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

print("=== INCOGNITO LIVE E2E CHECKOUT FLOW VERIFICATION ===", flush=True)

options = Options()
options.add_argument("--headless=new")
options.add_argument("--incognito")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")

driver = webdriver.Chrome(options=options)

print(f"1. Opening live website: {live_url}...", flush=True)
driver.get(live_url)
time.sleep(5)

try:
    add_btns = driver.find_elements(By.XPATH, "//button[contains(text(), 'Add to Bag') or contains(text(), 'ADD TO BAG')]")
    print(f"Found {len(add_btns)} Add to Bag buttons on live page.", flush=True)
    
    if add_btns:
        print("2. Clicking 'Add to Bag' button...", flush=True)
        driver.execute_script("arguments[0].click();", add_btns[0])
        time.sleep(3)
        
        checkout_btns = driver.find_elements(By.XPATH, "//button[contains(text(), 'Proceed to Checkout') or contains(., 'Proceed to Checkout')]")
        print(f"Found {len(checkout_btns)} Proceed to Checkout buttons.", flush=True)
        
        if checkout_btns:
            print("3. Clicking 'Proceed to Checkout' button...", flush=True)
            driver.execute_script("arguments[0].click();", checkout_btns[0])
            print("Waiting 10s for Shopify Checkout to render...", flush=True)
            time.sleep(10)
            
            final_url = driver.current_url
            page_title = driver.title
            
            print(f"\nFinal URL reached: {final_url}", flush=True)
            print(f"Page Title: {page_title}", flush=True)
            
            driver.save_screenshot(os.path.join(output_dir, "live_checkout_e2e_proof.png"))
            
            page_text = driver.find_element(By.TAG_NAME, "body").text.encode('ascii', errors='ignore').decode('ascii')
            
            print("\n=== DOM CHECKOUT VERIFICATION RESULTS ===", flush=True)
            print("Redirected to Checkout Domain?:", "/checkouts/" in final_url or "/cart/c/" in final_url or "checkout" in final_url.lower(), flush=True)
            print("Contains 'Empty' in page text?:", "empty" in page_text.lower(), flush=True)
            print("Contains 'Subtotal' or 'Total'?:", any(k in page_text for k in ["Subtotal", "Total", "Price", "699", "1,149", "1,489"]), flush=True)
            
            lines = [l.strip() for l in page_text.split("\n") if l.strip()]
            print("\n--- FIRST 20 EXTRACTED DOM LINES ---", flush=True)
            for l in lines[:20]:
                print("  •", l, flush=True)
        else:
            print("Proceed to Checkout button not found in drawer.", flush=True)
    else:
        print("Add to Bag button not found on home page.", flush=True)

except Exception as e:
    print("E2E Test Exception:", e, flush=True)

driver.quit()
