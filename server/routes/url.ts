import { Request, Response, Router } from "express";
import { UpdateWriteOpResult } from "mongodb";

import Url from "../src/Url";

const router: Router = Router();
const url: Url = new Url();

router.get("/:email", async (req: Request, res: Response) => {
  const urls = await url.getUrls(req.params.email);
  res.send(urls);
});

router.post("/:email", async (req: Request, res: Response) => {
  const result: UpdateWriteOpResult = await url.addUrl(req.params.email, req.body.url);
  if (result.matchedCount === 0) {
    res.status(404)
      .send({ message: `${req.params.email} does not exist` });
  }
  else {
    res.send({ message: "Updated successfully" });
  }
});

export default router;
