from playwright.sync_api import sync_playwright

def main():
    with sync_playwright() as p:
        device = p.devices['Pixel 5']
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(**device)
        page = context.new_page()
        print("Navigating to live site...")
        page.goto('https://sentirebypc.com/perfumes/purple-oud', wait_until='networkidle')
        page.wait_for_timeout(2000)
        
        # Click Add to Bag
        buttons = page.query_selector_all('button')
        for b in buttons:
            txt = b.inner_text().strip()
            if 'Add to' in txt:
                print("Clicking button:", txt)
                b.click()
                break
                
        page.wait_for_timeout(3000)
        page.screenshot(path='scratch/mobile_live_cart.png')
        print("Saved scratch/mobile_live_cart.png")
        browser.close()

if __name__ == '__main__':
    main()
