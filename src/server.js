const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');

const PORT = config.port || 4000;

async function start() {
  let server;
  try {
    if (config.mongoUri) {
      await mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to MongoDB thi', config.mongoUri);
    } else {
      console.log('No MONGO_URI provided, skipping DB connection');
    }

    server = app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} already in use. Please free the port or change PORT.`);
        process.exit(1);
      }
      throw err;
    });

    const shutdown = async () => {
      console.log('Shutting down server...');
      if (server) server.close();
      try { await mongoose.disconnect(); } catch (e) { console.log('Error disconnecting MongoDB', e); }
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    console.error('Failed to start server', err);
    if (server) server.close();
    process.exit(1);
  }
}

start();
