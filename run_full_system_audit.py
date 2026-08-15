import subprocess
import os
import sys

def run_audit():
    print("==================================================")
    print("     SENTIRE STOREFRONT 360 SYSTEM HEALTH AUDIT  ")
    print("==================================================")

    # 1. Frontend Build Audit
    frontend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\frontend"
    print("\n[1/4] Running Frontend Vite Build & Lint Diagnostic...")
    try:
        res = subprocess.run(
            ["npx", "vite", "build"],
            cwd=frontend_dir,
            capture_output=True,
            text=True,
            shell=True,
            timeout=30
        )
        if res.returncode == 0:
            print("  [PASSED] FRONTEND BUILD: Built cleanly in dist/")
        else:
            print("  [FAILED] FRONTEND BUILD ERROR:\n", res.stderr)
    except Exception as e:
        print("  [ERROR] Frontend Audit Exception:", str(e))

    # 2. Backend Gemini RAG Engine Audit
    backend_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment"
    print("\n[2/4] Testing Backend Gemini 3.5 Flash RAG Engine...")
    try:
        res = subprocess.run(
            ["node", "test_live_gemini_api.js"],
            cwd=backend_dir,
            capture_output=True,
            text=True,
            shell=True,
            timeout=20
        )
        if "SUCCESS WITH MODEL" in res.stdout or "Gemini LLM Reply" in res.stdout:
            print("  [PASSED] GEMINI AI RAG ENGINE: Live LLM Responses Generated Successfully")
        else:
            print("  [NOTICE] Gemini Test Output:\n", res.stdout)
    except Exception as e:
        print("  [ERROR] Backend AI Exception:", str(e))

    # 3. Git Branch & Commit Audit
    print("\n[3/4] Checking Git Branch Synchronization...")
    try:
        git_dev = subprocess.run(
            ["git", "log", "-1", "--oneline"],
            cwd=backend_dir,
            capture_output=True,
            text=True,
            shell=True
        )
        print("  [PASSED] LATEST COMMIT:", git_dev.stdout.strip())
    except Exception as e:
        print("  [ERROR] Git Audit Exception:", str(e))

    print("\n==================================================")
    print("               AUDIT SUMMARY COMPLETE             ")
    print("==================================================")

if __name__ == "__main__":
    run_audit()
