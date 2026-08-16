import shutil
import os

src_csv = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\shopify_all_11_perfumes_import.csv"
desktop_csv = r"C:\Users\asus\Desktop\shopify_all_11_perfumes_import.csv"
downloads_csv = r"C:\Users\asus\Downloads\shopify_all_11_perfumes_import.csv"

shutil.copyfile(src_csv, desktop_csv)
shutil.copyfile(src_csv, downloads_csv)

print("Copied CSV to Desktop and Downloads!")
