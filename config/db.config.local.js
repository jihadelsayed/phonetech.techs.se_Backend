module.exports = {
  USER: "postgres",
  HOST: "localhost",
  DB: "phonetech.techsdb",
  PASSWORD: "1996",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
