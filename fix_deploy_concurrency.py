deploy_yml_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\.github\workflows\deploy.yml"

with open(deploy_yml_path, "r", encoding="utf-8") as f:
    code = f.read()

concurrency_block = """
concurrency:
  group: cloud-run-deployment
  cancel-in-progress: false
"""

if "concurrency:" not in code:
    code = code.replace("on:\n  push:\n    branches:\n      - main\n      - dev", "on:\n  push:\n    branches:\n      - main\n      - dev\n" + concurrency_block)
    with open(deploy_yml_path, "w", encoding="utf-8") as f:
        f.write(code)
    print("SUCCESS: Added concurrency queueing to deploy.yml!")

