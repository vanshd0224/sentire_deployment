const mongoose = require('mongoose');

const uri = "mongodb+srv://vgupta242004_db_user:PM9V8Modrfry6yRA@clusterbackend.dxe8poq.mongodb.net/sentire_db?retryWrites=true&w=majority&appName=Clusterbackend";

console.log("=== TESTING MONGODB CONNECTION ===");
mongoose.connect(uri)
  .then(() => {
    console.log("SUCCESS: CONNECTED TO MONGODB ATLAS CLUSTER!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Connection Error:", err.message);
    process.exit(1);
  });
