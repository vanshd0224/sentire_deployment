from playwright.sync_api import sync_playwright
import time

url = "https://1drv.ms/f/c/3b2e9c32a6a96f54/IgB4b-eezrykQJpGwG6g4tGyAfp34cMIqDXuy9fNLP8ZoA0?e=yekPPh"

print("=== LAUNCHING PLAYWRIGHT TO INSPECT ONEDRIVE FOLDER ===")

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    
    print("Navigating to OneDrive link...")
    page.goto(url, wait_until="networkidle", timeout=60000)
    time.sleep(5)
    
    title = page.title()
    print("Page Title:", title)
    
    # Extract text content and item names
    content = page.content()
    
    # Query all visible list items / folder names
    items = page.query_selector_all("[data-automationid='name']")
    if not items:
        items = page.query_selector_all(".od-ItemTile-title, .od-ItemName, div[role='row'], span[class*='name']")
        
    print(f"\nFound {len(items)} elements on page:")
    for el in items[:30]:
        text = el.inner_text().strip()
        if text:
            print("  • Item:", text)
            
    # Save a screenshot to inspect visually if needed
    page.screenshot(path="onedrive_folder_preview.png")
    print("Saved preview screenshot to onedrive_folder_preview.png")

    browser.close()
