import { Db, MongoClient } from "mongodb";
const { DB_URI } = require("../appconfig.json");

class DB {
  private static db: Db;

  public static async getConnection(): Promise<Db> {
    if (DB.db) {
      return DB.db;
    }
    const client = new MongoClient(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    try {
      await client.connect();
      console.log("Connected to MongoDB.")
      DB.db = client.db();
      return DB.db;
    }
    catch (error) {
      throw new Error("Failed to connect to mongoDB");
    }
  }
}

export default DB;
