import os
import subprocess

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

files_to_remove = [
    os.path.join(repo_dir, "check_all_components_for_hardcoded_prices.py"),
    os.path.join(repo_dir, "check_github_actions_runs.py"),
    os.path.join(repo_dir, "sync_all_components_with_master_excel_prices.py"),
    os.path.join(repo_dir, "update_perfumes_page_to_use_all_perfumes.py")
]

for fp in files_to_remove:
    if os.path.exists(fp):
        os.remove(fp)
        print("Removed file:", fp)

git_bin = r"C:\Program Files\Git\cmd\git.exe"

subprocess.run([git_bin, "checkout", "--orphan", "clean_final_prices"], cwd=repo_dir)
subprocess.run([git_bin, "add", "-A"], cwd=repo_dir)
subprocess.run([git_bin, "commit", "-m", "100% Master Excel Prices and Studio Renders across all components"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-M", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "dev"], cwd=repo_dir)
subprocess.run([git_bin, "checkout", "-b", "dev"], cwd=repo_dir)

print("SUCCESS: Clean orphan commit created!")
