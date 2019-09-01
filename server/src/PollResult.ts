import { Cursor, Db, WriteOpResult } from "mongodb";

import { collections } from "../constants";
import DB from "./DB";

class PollResult {
  public async savePollResults(pollResults: IPollResult | IPollResult[]): Promise<WriteOpResult> {
    try {
      const db: Db = await DB.getConnection();
      const writeResult = await db.collection(collections.POLL_RESULTS).insert(pollResults);
      return writeResult;
    }
    catch (error) {
      throw error;
    }
  }

  public async getPollResults(filter: IPollResultFilter): Promise<IPollResult[]> {
    try {
      const db: Db = await DB.getConnection();
      const query: any = {
        url: filter.url
      };
      if (filter.fromDate) {
        query.lastCheckedOn = filter.fromDate;
      }

      const cursor: Cursor = await db.collection(collections.POLL_RESULTS)
        .find(query, {
          limit: filter.limit,
          projection: {
            _id: 0
          }
        });

      const pollResults: IPollResult[] = await cursor.toArray();
      return pollResults;
    }
    catch (error) {
      throw error;
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

export interface IPollResultFilter {
  url: string;
  fromDate?: Date;
  limit: number;
}

export default PollResult;
