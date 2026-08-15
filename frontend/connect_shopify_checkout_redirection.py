import os

index_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend\index.html"

checkout_script = """
<!-- Sentire Parfums Live Shopify Checkout Redirection -->
<script>
  (function() {
    const SHOPIFY_CHECKOUT_URL = 'https://hbj1d0-99.myshopify.com/cart';

    function attachCheckoutRedirect() {
      // Find all checkout buttons on the page (by text or class)
      const buttons = document.querySelectorAll('button, a');
      buttons.forEach(btn => {
        const text = (btn.textContent || '').toUpperCase();
        if (text.includes('PROCEED TO CHECKOUT') || text.includes('CHECKOUT')) {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Redirecting to Live Shopify Checkout:', SHOPIFY_CHECKOUT_URL);
            window.location.href = SHOPIFY_CHECKOUT_URL;
          }, true);
        }
      });
    }

    // Attach listener when DOM is ready and observe dynamic drawer changes
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachCheckoutRedirect);
    } else {
      attachCheckoutRedirect();
    }

    const observer = new MutationObserver(() => {
      attachCheckoutRedirect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  })();
</script>
"""

with open(index_path, 'r', encoding='utf-8') as f:
    content = f.read()

if 'SHOPIFY_CHECKOUT_URL' not in content:
    new_content = content.replace('</body>', checkout_script + '\n</body>')
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("SUCCESS: Injected Live Shopify Checkout Redirection script into index.html!")
else:
    print("Redirection script already present in index.html")
