import os
import shutil

scratch_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

temp_files = [
    "temp_zip_extract", "onedrive_zip_download", "scraped_50ml_images", "downloaded_50ml",
    "check_50ml_images.py", "extract_all_50ml_details.py", "scrape_onedrive_folder.py",
    "test_onedrive_api.py", "test_onedrive_skyapi.py", "test_headless_browser.py",
    "scrape_onedrive_with_playwright.py", "scrape_onedrive_with_selenium.py",
    "extract_onedrive_elements.py", "download_all_onedrive_images.py",
    "download_onedrive_folders_exact.py", "download_onedrive_zip.py",
    "download_onedrive_by_selecting_all.py", "download_all_11_perfume_images.py",
    "process_and_deploy_all_11_50ml_images.py", "verify_50ml_folder_structure.py",
    "onedrive_folder_preview.png", "onedrive_selenium_preview.png"
]

print("=== CLEANING TEMPORARY SCRIPTS & SCRAPED DIRS ===")
for f in temp_files:
    p = os.path.join(scratch_dir, f)
    if os.path.exists(p):
        if os.path.isdir(p):
            shutil.rmtree(p)
        else:
            os.remove(p)
        print("Removed:", f)

print("Cleanup complete!")
