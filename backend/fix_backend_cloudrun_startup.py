import os

server_path = r"C:\Users\asus\.gemini\antigravity\scratch\sentire_deployment\backend\server.js"

with open(server_path, 'r', encoding='utf-8') as f:
    code = f.read()

old_start_server = """const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, HOST, () => {
    logger.info(`Server running on http://${HOST}:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });"""

new_start_server = """const startServer = async () => {
  // Bind HTTP server IMMEDIATELY to pass Cloud Run container startup health check
  const server = app.listen(PORT, HOST, () => {
    logger.info(`Server running on http://${HOST}:${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });

  // Connect to DB asynchronously without blocking server listening
  connectDB().catch(err => logger.warn(`Database async connection notice: ${err.message}`));"""

code = code.replace(old_start_server, new_start_server)

with open(server_path, 'w', encoding='utf-8') as f:
    f.write(code)

print("SUCCESS: Updated backend/server.js to bind PORT=8080 instantly for Cloud Run")
