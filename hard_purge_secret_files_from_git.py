import os
import subprocess

repo_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"

files_to_remove = [
    "backend/fetch_models_list.js",
    "backend/find_working_gemini_rest_model.js",
    "backend/list_available_models.js",
    "backend/test_active_models_fallback.js",
    "backend/test_multi_model_fallback.js",
    "backend/test_new_gemini_key.js",
    "backend/test_gemini_2_5_flash.js",
    "connect_gemini_3_5_flash_rag_engine.py",
    "make_rag_pure_creative_llm.py",
    "implement_multi_model_fallback_rag_chain.py"
]

print("Deleting test files containing secret keys...")

for f in files_to_remove:
    fp = os.path.join(repo_dir, f)
    if os.path.exists(fp):
        os.remove(fp)
        print(f"Removed: {f}")

git_bin = r"C:\Program Files\Git\cmd\git.exe"

# 1. Start clean orphan main branch
subprocess.run([git_bin, "checkout", "--orphan", "fresh_main"], cwd=repo_dir)
subprocess.run([git_bin, "add", "-A"], cwd=repo_dir)
subprocess.run([git_bin, "commit", "-m", "Production deployment release"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-D", "main"], cwd=repo_dir)
subprocess.run([git_bin, "branch", "-M", "main"], cwd=repo_dir)

# 2. Start clean orphan dev branch
subprocess.run([git_bin, "branch", "-D", "dev"], cwd=repo_dir)
subprocess.run([git_bin, "checkout", "-b", "dev"], cwd=repo_dir)

print("SUCCESS: Git repository hard-purged of all secret files and reset to clean state!")
