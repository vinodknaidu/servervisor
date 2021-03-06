import { NextFunction, Request, Response } from "express";
import { Db } from "mongodb";

import { collections } from "../constants";
import DB from "./DB";

class Auth {
  private async authenticate(email: string, password: string): Promise<object> {
    try {
      const db: Db = await DB.getConnection();
      const user: object = db.collection(collections.USERS)
        .findOne(
          {
            email,
            password
          },
          {
            projection: {
              firstName: 1,
              lastName: 1,
              email: 1,
              _id: 0
            }
          }
        );
      return user;
    }
    catch (error) {
      throw error;
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
        res.status(400).json({ message: "Wrong credentials" });
      }
    }
    catch (error) {
      throw error;
    }
  }

  public async authorize(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.session!.userDetails) {
        next();
      }
      else {
        res.status(401).send();
      }
    }
    catch (error) {
      throw error;
    }
  }
}

export default Auth;
