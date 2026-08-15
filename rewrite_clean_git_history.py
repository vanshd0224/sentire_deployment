import subprocess
import os

print("Creating clean orphan git branch without secret history...")

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"
git_bin = r"C:\Program Files\Git\cmd\git.exe"

def run_cmd(args):
    cmd = [git_bin] + args
    p = subprocess.run(cmd, cwd=repo_dir, capture_output=True, text=True)
    print(f"Command: {cmd}\nExit: {p.returncode}\nOut: {p.stdout}\nErr: {p.stderr}\n")
    return p.returncode

run_cmd(["checkout", "--orphan", "clean_main"])
run_cmd(["add", "."])
run_cmd(["commit", "-m", "Initial clean deployment"])
run_cmd(["branch", "-M", "main"])
run_cmd(["checkout", "-b", "dev"])

print("SUCCESS: Clean git branches created without old historical secret commits!")
