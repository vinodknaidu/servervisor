import axios, { AxiosResponse } from "axios";

import pollResult, { IPollResult } from './PollResult';
import PollResult from "./PollResult";
import Url from "./Url";

class Poller {
  private async checkStatus(url: string): Promise<ICheckStatusResult> {
    const startTime: number = new Date().getTime();
    try {
      const res: AxiosResponse = await axios.get(url);
      const endTime: number = new Date().getTime();

      const status: ICheckStatusResult = {
        statusCode: res.status,
        statusText: res.statusText,
        responseTime: endTime - startTime
      };

      return status;
    }
    catch (error) {
      const endTime: number = new Date().getTime();
      const status: ICheckStatusResult = {
        statusCode: 0,
        statusText: "Failed",
        responseTime: endTime - startTime
      };

      return status;
    }
  }

  private async poll(urls: string | string[]): Promise<IPollResult | IPollResult[]> {
    try {
      if (!Array.isArray(urls)) {
        urls = [urls];
      }
      const polls: any[] = [];
      const pollResults: IPollResult[] = [];

      const self = this;
      urls.forEach((url) => {
        polls.push(
          ((url: string) => {
            return new Promise(async (resolve, reject) => {
              const IcheckStatusResult: ICheckStatusResult = await self.checkStatus(url);
              const pollResult: IPollResult = {
                ...IcheckStatusResult,
                lastCheckedOn: new Date(),
                url
              };
              pollResults.push(pollResult);
              resolve();
            });
          })(url)
        );
      });

      await Promise.all(polls);
      if (Array.isArray(urls)) {
        return pollResults;
      }
      else {
        return pollResults[0];
      }
    }
    catch (error) {
      throw error;
    }
  }

  public pollAndSaveResults = async () => {
    try {
      const url = new Url();
      const urls: string[] = await url.getAllUrls();
      const pollResults: IPollResult[] | IPollResult = await this.poll(urls);
      await new PollResult().savePollResults(pollResults);
    }
    catch (error) {
      throw error;
    }
  }
}

interface ICheckStatusResult {
  statusCode: number;
  statusText: string;
  responseTime: number;
}

export default Poller;
