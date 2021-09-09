require('dotenv').config();

module.exports = {
  "type": process.env.TYPEORM_TYPE,
  "host": process.env.TYPEORM_HOST,
  "port": process.env.TYPEORM_PORT,
  "username": process.env.TYPEORM_USERNAME,
  "password": process.env.TYPEORM_PASSWORD,
  "database": process.env.TYPEORM_DATABASE,
  "entities": [
    "./src/modules/**/model/*.ts",
    "./dist/modules/**/model/*.ts"
  ],
  "migrations": [
    "./src/database/migrations/**.ts",
    "./dist/database/migrations/**.ts"
  ],
  "cli": {
    "migrationsDir": "./src/database/migrations",
    "migrationsDir": "./dist/database/migrations"
  }
}
