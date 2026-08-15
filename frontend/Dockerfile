# Multi-stage Dockerfile for Vite React Frontend on Cloud Run
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production Runner using Nginx on port 8080
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html

# Configure Nginx to listen on port 8080 with SPA routing fallback
RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf || true

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
