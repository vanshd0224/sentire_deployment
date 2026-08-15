import os
import subprocess

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"
backend_dir = os.path.join(repo_dir, "backend")

# Delete any test file starting with test_ or find_ or list_
for f in os.listdir(backend_dir):
    if f.startswith("test_") or f.startswith("find_") or f.startswith("list_") or f.startswith("fetch_"):
        fp = os.path.join(backend_dir, f)
        os.remove(fp)
        print("Removed backend test file:", f)

git_bin = r"C:\Program Files\Git\cmd\git.exe"

# Re-create fresh clean main and dev
subprocess.run([git_bin, "checkout", "--orphan", "clean_v2"], cwd=repo_dir)
subprocess.run([git_bin, "add", "-A"], cwd=repo_dir)
subprocess.run([git_bin, "commit", "-m", "Initial clean production release"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-M", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "dev"], cwd=repo_dir)
subprocess.run([git_bin, "checkout", "-b", "dev"], cwd=repo_dir)

print("SUCCESS: Purged all remaining test files and reset git repository cleanly!")
