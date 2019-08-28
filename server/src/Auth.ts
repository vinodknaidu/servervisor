import { NextFunction, Request, Response } from "express";

import DB from "./DB";

class Auth {
  private async authenticate(email: string, password: string): Promise<object> {
    try {
      const conn = await DB.getConnection();
      const user: object = conn.collection("users").findOne({
        email,
        password
      });
      return user;
    }
    catch (err) {
      throw new Error("authenticate() :: " + err);
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const user: object = await this.authenticate(req.body.email, req.body.password);
      if (user) {
        req.session!.userDetails = user;
        res.send(user);
      }
      else {
        res.status(404).json({ message: "Wrong credentials" });
      }
    }
    catch (err) {
      throw new Error("login() :: " + err);
    }
  }

  public authorize = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.session!.userDetails) {
        next();
      }
      else {
        res.status(401).send();
      }
    }
    catch (err) {
      throw new Error("authorize() :: " + err);
    }
  }
}

export default Auth;