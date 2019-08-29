import { Cursor, Db, UpdateWriteOpResult } from "mongodb";

import DB from "./DB";

class Url {
  public async getUrls(email: string): Promise<IUrl[]> {
    try {
      const db: Db = await DB.getConnection();
      const urls = await db.collection("users")
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
      throw new Error(`getUrls() :: ${error}`);
    }
  }

  public async getAllUrls(): Promise<string[]> {
    try {
      const db: Db = await DB.getConnection();
      const cursor: Cursor = await db.collection("users").find(
        {},
        {
          projection: {
            _id: 0,
            urls: 1
          }
        }
      );
      const urlSet: Set<string> = new Set();
      await cursor.forEach(({ urls }) => {
        urls.forEach((url: IUrl) => {
          urlSet.add(url.url);
        });
      });

      return Array.from(urlSet);
    }
    catch (error) {
      throw new Error(`getAllUrls() :: ${error}`);
    }
  }

  public async addUrl(email: string, url: string): Promise<UpdateWriteOpResult> {
    try {
      const urlObj = {
        url,
        addedOn: new Date(),
        status: "active"
      };

      const db: Db = await DB.getConnection();
      const result: UpdateWriteOpResult = await db.collection("users")
        .updateOne({ email }, {
          $push: {
            urls: urlObj
          }
        });

      return result;
    }
    catch (error) {
      throw new Error(`addUrl() :: ${error}`);
    }
  }

  public async changeUrlStatus(email: string, url: IUrlStatus): Promise<UpdateWriteOpResult> {
    try {
      const db: Db = await DB.getConnection();
      const result: UpdateWriteOpResult = await db.collection("users")
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
      throw new Error(`changeUrlStatus() :: ${error}`);
    }
  }
}

export interface IUrlStatus {
  url: string;
  status: string;
}

export interface IUrl {
  url: string;
  createdOn: Date;
  status: string;
}

export default Url;
