import { AggregationCursor, Db, UpdateWriteOpResult } from "mongodb";

import { collections } from "../constants";
import DB from "./DB";

class Url {
  public async getUrls(email: string): Promise<IUrl[]> {
    try {
      const db: Db = await DB.getConnection();
      const urls = await db.collection(collections.USERS)
        .findOne(
          {
            email,
            status: { $ne: "deleted" }
          }, {
            projection: { _id: 0, urls: 1 }
          }
        );

      if (!urls || !urls.urls) {
        return [];
      }
      else {
        return urls.urls;
      }
    }
    catch (error) {
      throw error;
    }
  }

  public async getAllUrls(): Promise<string[]> {
    try {
      const db: Db = await DB.getConnection();
      const cursor: AggregationCursor = await db.collection(collections.USERS).aggregate([
        {
          $project: {
            urls: {
              $filter: {
                input: "$urls",
                cond: { $eq: ["$$this.status", "active"] }
              }
            }
          }
        }
      ]);

      const users = await cursor.toArray();
      const urlSet: Set<string> = new Set();
      users.forEach((user) => {
        user.urls.forEach((url: IUrl) => {
          urlSet.add(url.url);
        });
      });

      return Array.from(urlSet);
    }
    catch (error) {
      throw error;
    }
  }

  public async addUrl(email: string, url: string): Promise<IUrl> {
    try {
      const urlObj: IUrl = {
        url,
        addedOn: new Date(),
        status: "active"
      };

      const db: Db = await DB.getConnection();
      const result: UpdateWriteOpResult = await db.collection(collections.USERS)
        .updateOne({ email }, {
          $push: {
            urls: urlObj
          }
        });

      return urlObj;
    }
    catch (error) {
      throw error;
    }
  }

  public async changeUrlStatus(email: string, url: IUrlStatus): Promise<UpdateWriteOpResult> {
    try {
      const db: Db = await DB.getConnection();
      const result: UpdateWriteOpResult = await db.collection(collections.USERS)
        .updateOne(
          {
            email,
            "urls.url": url.url
          }, {
            $set: { "urls.$.status": url.status }
          }
        );
      return result;
    }
    catch (error) {
      throw error;
    }
  }
}

export interface IUrlStatus {
  url: string;
  status: string;
}

export interface IUrl {
  url: string;
  addedOn: Date;
  status: string;
}

export default Url;
