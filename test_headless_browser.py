import subprocess

print("=== CHECKING HEADLESS BROWSER TOOLS ===")
try:
    import selenium
    print("Selenium is installed!")
except ImportError:
    print("Selenium is not installed.")

try:
    import playwright
    print("Playwright is installed!")
except ImportError:
    print("Playwright is not installed.")
