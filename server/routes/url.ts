import { Request, Response, Router } from "express";
import { UpdateWriteOpResult } from "mongodb";

import Url, { IUrl, IUrlStatus } from "../src/Url";

const router: Router = Router();
const url: Url = new Url();

router.get("/", async (req: Request, res: Response) => {
  const urls = await url.getUrls(req.session!.userDetails.email);
  res.send(urls);
});

router.post("/", async (req: Request, res: Response) => {
  const urlToAdd = req.body.url.match(/^http.+\.{1}[a-zA-Z]+$/);
  if (!urlToAdd) {
    return res.status(400).send({ message: "Invalid url" });
  }

  const result: IUrl = await url.addUrl(req.session!.userDetails.email, req.body.url);
  if (result) {
    res.send(result);
  }
  else {
    res.status(404).send({ message: "Failed to add url" });
  }
});

router.put(
  ["/activate", "/deactivate", "/delete"],
  async (req: Request, res: Response) => {
    const urlStatus: IUrlStatus = {
      url: req.body.url,
      status: "active"
    };

    if (req.path.match("/deactivate")) {
      urlStatus.status = "inactive";
    }
    else if (req.path.match("/delete")) {
      urlStatus.status = "deleted";
    }

    const result: UpdateWriteOpResult = await url.changeUrlStatus(req.session!.userDetails.email, urlStatus);
    if (result.matchedCount) {
      res.send({ message: "Updated successfully" });
    }
    else {
      res.status(404)
        .send({ message: `${req.params.email} does not exist` });
    }
  }
);

export default router;
