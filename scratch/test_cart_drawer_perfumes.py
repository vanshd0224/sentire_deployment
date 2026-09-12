from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 390, 'height': 844})
        print("Navigating to https://sentirebypc.com/perfumes...")
        page.goto('https://sentirebypc.com/perfumes', wait_until='domcontentloaded')
        page.wait_for_timeout(2000)
        
        # Click on the first Add to Bag button on perfumes grid
        buttons = page.locator('button:has-text("Add to Bag"), button:has-text("Add")').all()
        print(f"Found {len(buttons)} buttons")
        for b in buttons:
            if b.is_visible():
                print("Clicking Add button:", b.inner_text())
                b.click(force=True)
                break
                
        page.wait_for_timeout(3000)
        page.screenshot(path='scratch/live_cart_drawer_perfumes.png')
        print("Saved scratch/live_cart_drawer_perfumes.png")
        browser.close()

if __name__ == '__main__':
    main()
