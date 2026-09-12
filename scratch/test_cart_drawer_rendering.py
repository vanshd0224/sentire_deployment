from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 390, 'height': 844})
        page.goto('https://sentirebypc.com/perfumes/purple-oud', wait_until='domcontentloaded')
        page.wait_for_timeout(2000)
        
        # Click "Add to Bag" inside the ProductDetailModal sticky bar
        # In ProductDetailModal, the button says "Add to Bag →"
        btn = page.locator('button:has-text("Add to Bag")').first
        if btn.is_visible():
            print("Found Add to Bag button in modal, clicking...")
            btn.click(force=True)
            page.wait_for_timeout(2500)
        
        # Now CartDrawer should be open!
        page.screenshot(path='scratch/live_cart_modal_test.png')
        print("Screenshot saved to scratch/live_cart_modal_test.png")
        browser.close()

if __name__ == '__main__':
    main()
