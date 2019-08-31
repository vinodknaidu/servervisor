import axios, { AxiosResponse } from "axios";

import pollResult, { IPollResult } from './PollResult';
import Url from "./Url";
import PollResult from "./PollResult";

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

  private async poll(urls: string[]) {
    try {
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
      new PollResult().saveResults(pollResults);
    }
    catch (error) {
      throw new Error(`poll() :: ${error}`);
    }
  }

  public async startPolling() {
    try {
      const url = new Url();
      const urls: string[] = await url.getAllUrls();
      await this.poll(urls);
    }
    catch (error) {
      throw new Error(`startPolling() :: ${error}`);
    }
  }
}

interface ICheckStatusResult {
  statusCode: number;
  statusText: string;
  responseTime: number;
}

export default Poller;
