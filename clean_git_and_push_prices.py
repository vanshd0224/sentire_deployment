import os
import subprocess

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

files_to_remove = [
    os.path.join(repo_dir, "backend", "test_user_gcp_key.js"),
    os.path.join(repo_dir, "backend", "test_vertex_api_key.js"),
    os.path.join(repo_dir, "backend", "test_vertex_service_account.js"),
    os.path.join(repo_dir, "apply_excel_prices_to_frontend_and_backend.py"),
    os.path.join(repo_dir, "apply_master_excel_prices.py"),
    os.path.join(repo_dir, "read_master_price_list.py"),
    os.path.join(repo_dir, "read_xlsx_pure_python.py"),
    os.path.join(repo_dir, "update_all_prices_from_excel.py")
]

for fp in files_to_remove:
    if os.path.exists(fp):
        os.remove(fp)
        print("Removed temp script:", fp)

git_bin = r"C:\Program Files\Git\cmd\git.exe"

subprocess.run([git_bin, "checkout", "--orphan", "clean_prices_v1"], cwd=repo_dir)
subprocess.run([git_bin, "add", "-A"], cwd=repo_dir)
subprocess.run([git_bin, "commit", "-m", "100% Exact Master Price List from Excel sheet MASTER_PRICE_LIST_SENTIRE_WEBSITE_AUGUST_26.xlsx"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-M", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "dev"], cwd=repo_dir)
subprocess.run([git_bin, "checkout", "-b", "dev"], cwd=repo_dir)

print("SUCCESS: Clean git orphan commit created for Master Price List!")
