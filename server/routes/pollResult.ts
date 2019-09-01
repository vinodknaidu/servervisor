import { Request, Response, Router } from "express";

import { limits } from "../constants";
import { IPollResultFilter } from "../src/PollResult";
import PollResult from "../src/PollResult";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  if (!req.query.url) {
    res.status(400).send({ message: "url required to fetch poll results." });
    return;
  }
  const filter: IPollResultFilter = {
    url: req.query.url,
    limit: limits.POLL_RESULTS
  };
  if (req.query.fromDate) {
    filter.fromDate = req.query.fromDate;
  }

  const pollResult: PollResult = new PollResult();
  const results = await pollResult.getPollResults(filter);
  res.send(results);
});

export default router;
