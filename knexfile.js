const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL 
  // = "postgres://iivcesay:Vs9sJDtoP7XhB0M_AwPjxhf9-YB6hiBS@berry.db.elephantsql.com/iivcesay"
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: DATABASE_URL,
   // "postgres://iivcesay:Vs9sJDtoP7XhB0M_AwPjxhf9-YB6hiBS@berry.db.elephantsql.com/iivcesay",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: DATABASE_URL,
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
