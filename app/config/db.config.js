module.exports = {
    host: 'database-1.cvtuvldhfhgg.us-east-1.rds.amazonaws.com',
    user: 'postgres',
    password: 'frisles.india',
    database: 'postgres',
    dialect: "postgres",
    port: 5432,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};