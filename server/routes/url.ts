import { Request, Response, Router } from "express";
import { UpdateWriteOpResult } from "mongodb";

import Url, { IUrlStatus } from "../src/Url";

const router: Router = Router();
const url: Url = new Url();

router.get("/", async (req: Request, res: Response) => {
  const urls = await url.getUrls(req.session!.userDetails.email);
  res.send(urls);
});

router.post("/", async (req: Request, res: Response) => {
  const result: UpdateWriteOpResult = await url.addUrl(req.session!.userDetails.email, req.body.url);
  if (result.matchedCount) {
    res.send({ message: "Updated successfully" });
  }
  else {
    res.status(404)
      .send({ message: `${req.params.email} does not exist` });
  }
});

router.post(
  ["/activate", "/deactivate", "/delete"],
  async (req: Request, res: Response) => {
    const urlStatus: IUrlStatus = {
      url: req.body.url,
      status: ""
    };

    if (req.path.match("/activate")) {
      urlStatus.status = "active";
    }
    else if (req.path.match("/deactivate")) {
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
