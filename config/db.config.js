module.exports = {
  USER: "postgres",
  HOST: "db.iqgyjwzutcobtwtoyoyp.supabase.co",
  DB: "phonetechDB",
  PASSWORD: "f5Q+?-nbnX#KGY_",
  port: 5432,
  dialect: "postgres",
  ssl: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
