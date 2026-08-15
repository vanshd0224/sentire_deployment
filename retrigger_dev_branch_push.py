import os
import subprocess

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"
git_bin = r"C:\Program Files\Git\cmd\git.exe"

# Make a tiny trigger comment in .github/workflows/deploy.yml
deploy_yml = os.path.join(repo_dir, ".github", "workflows", "deploy.yml")
with open(deploy_yml, "r", encoding="utf-8") as f:
    code = f.read()

if "# Trigger clean dev deployment" not in code:
    code = code + "\n# Trigger clean dev deployment\n"
    with open(deploy_yml, "w", encoding="utf-8") as f:
        f.write(code)

subprocess.run([git_bin, "checkout", "dev"], cwd=repo_dir)
subprocess.run([git_bin, "add", "-A"], cwd=repo_dir)
subprocess.run([git_bin, "commit", "-m", "Re-trigger clean dev deployment pipeline"], cwd=repo_dir)
subprocess.run([git_bin, "push", "origin", "dev"], cwd=repo_dir)

print("SUCCESS: Triggered clean dev branch deployment pipeline!")
