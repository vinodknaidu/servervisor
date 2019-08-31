import { Db, WriteOpResult } from "mongodb";

import { collections } from "../constants";
import DB from "./DB";

class PollResult {
  public async saveResults(pollResults: IPollResult | IPollResult[]): Promise<WriteOpResult> {
    try {
      const db: Db = await DB.getConnection();
      const writeResult = await db.collection(collections.POLL_RESULTS).insert(pollResults);
      return writeResult;
    }
    catch (error) {
      throw new Error(`saveResults() :: ${error}`);
    }
  }
}

export interface IPollResult {
  statusCode: number;
  statusText: string;
  responseTime: number;
  url: string;
  lastCheckedOn: Date;
}

export default PollResult;
