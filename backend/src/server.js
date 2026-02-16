import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { startJobWorker } from "./workers/job.worker.js";

const startServer = async () => {
  await connectDB();

  startJobWorker();
  
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();
