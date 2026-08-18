import subprocess

print("=== CHECKING GCLOUD CLI / DEPLOYMENT TOOLS ===")

try:
    res = subprocess.run(["gcloud", "--version"], capture_output=True, text=True)
    print("gcloud output:", res.stdout)
except Exception as e:
    print("gcloud error:", e)

try:
    res_docker = subprocess.run(["docker", "--version"], capture_output=True, text=True)
    print("docker output:", res_docker.stdout)
except Exception as e:
    print("docker error:", e)
