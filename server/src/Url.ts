import { Db, UpdateWriteOpResult } from "mongodb";

import DB from "./DB";

class Url {
  public async getUrls(email: string): Promise<IUrls[]> {
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

export interface IUrls {
  url: string;
  createdOn: Date;
  status: string;
}

export default Url;
