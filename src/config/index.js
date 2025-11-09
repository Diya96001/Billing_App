module.exports = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  env: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI || '',
};
