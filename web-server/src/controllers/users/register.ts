import { Request, Response, NextFunction } from "express";

import { User } from "orm/entities";
import { UserRepository } from "orm/repositories";
import { ServerAPI } from "types/openapi";

export const register = async (req: Request, res: Response, _next: NextFunction) => {
  const { email, password } = req.body as ServerAPI['RegisterUserPayload'];
  
  try {
    const user = new User();
    user.email = email;
    user.setPassword(password);
    await UserRepository.save(user);
    res.status(200).end();
  } catch (e) {
    res.status(500).end();
  }
};