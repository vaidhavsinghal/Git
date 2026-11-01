import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import dns from "node:dns";

dotenv.config({
  path: "./.env"
});

if (process.env.DNS_SERVER) {
  dns.setServers([process.env.DNS_SERVER]);
}

const startServer = async () => {
  try {
    await connectDB();

    app.on("error", (error) => {
      console.log("Application error:", error);
      throw error;
    });

    const port = process.env.PORT || 8000;

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Server startup failed:", error);
  }
};

startServer();