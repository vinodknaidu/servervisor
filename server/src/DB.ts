import { Db, MongoClient } from "mongodb";
import { DB_URI } from "../appconfig.json";

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
      console.log("Connected to MongoDB.");
      DB.db = client.db();
      return DB.db;
    }
    catch (error) {
      throw error;
    }
  }
}

export default DB;
