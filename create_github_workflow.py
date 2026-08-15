import os

workflow_dir = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\.github\workflows"
os.makedirs(workflow_dir, exist_ok=True)

github_workflow_yaml = """name: Build & Deploy to Google Cloud Run

on:
  push:
    branches:
      - main
      - dev

jobs:
  deploy-backend:
    name: Deploy Backend to Cloud Run
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Configure Docker for Artifact Registry
        run: |
          gcloud config set project ${{ secrets.GCP_PROJECT_ID }}
          gcloud artifacts repositories create ecommerce-backend-repo --repository-format=docker --location=asia-south1 --quiet || true
          gcloud auth configure-docker asia-south1-docker.pkg.dev --quiet

      - name: Build and Push Docker Image
        run: |
          docker build -t asia-south1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/ecommerce-backend-repo/ecommerce-backend:latest ./backend
          docker push asia-south1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/ecommerce-backend-repo/ecommerce-backend:latest

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ecommerce-backend \\
            --image asia-south1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/ecommerce-backend-repo/ecommerce-backend:latest \\
            --region asia-south1 \\
            --min-instances=1 \\
            --allow-unauthenticated \\
            --port 8080

  deploy-frontend:
    name: Deploy Frontend to Cloud Run
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Authenticate to Google Cloud
        uses: google-github-actions/auth@v2
        with:
          credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v2

      - name: Configure Docker for Artifact Registry
        run: |
          gcloud config set project ${{ secrets.GCP_PROJECT_ID }}
          gcloud artifacts repositories create ecommerce-frontend-repo --repository-format=docker --location=asia-south1 --quiet || true
          gcloud auth configure-docker asia-south1-docker.pkg.dev --quiet

      - name: Build and Push Docker Image
        run: |
          docker build -t asia-south1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/ecommerce-frontend-repo/ecommerce-frontend:latest ./frontend
          docker push asia-south1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/ecommerce-frontend-repo/ecommerce-frontend:latest

      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy ecommerce-frontend \\
            --image asia-south1-docker.pkg.dev/${{ secrets.GCP_PROJECT_ID }}/ecommerce-frontend-repo/ecommerce-frontend:latest \\
            --region asia-south1 \\
            --min-instances=1 \\
            --allow-unauthenticated \\
            --port 8080
"""

workflow_path = os.path.join(workflow_dir, "deploy.yml")
with open(workflow_path, "w", encoding="utf-8") as f:
    f.write(github_workflow_yaml)

print("SUCCESS: Created .github/workflows/deploy.yml for GitHub Actions Cloud Run Deployment!")
