import os
import subprocess

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

files_to_del = [
    "automatically_set_github_secrets.py",
    "check_github_workflow_status.py",
    "find_gcp_credentials.py"
]

for f in files_to_del:
    fp = os.path.join(repo_dir, f)
    if os.path.exists(fp):
        os.remove(fp)
        print(f"Deleted: {f}")

git_bin = r"C:\Program Files\Git\cmd\git.exe"
subprocess.run([git_bin, "add", "-A"], cwd=repo_dir)
subprocess.run([git_bin, "commit", "-m", "Purge secret helper scripts and 100% model photos"], cwd=repo_dir)

print("SUCCESS: Cleaned up secret helper scripts!")
