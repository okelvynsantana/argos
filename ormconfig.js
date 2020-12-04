const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

/**
 * Went to this approach due to limitations on typeORM when
 * loading env variables from both .env and ormconfig.js
 * (which is needed for naming strategy setting) simultaneously.
 */

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  migrations: ["src/database/migrations/*.{js,ts}"],
  entities: ["src/models/*.{js,ts}"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};
