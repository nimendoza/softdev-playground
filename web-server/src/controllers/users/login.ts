import { Request, Response, NextFunction } from "express";

import { ServerAPI } from "types/openapi";
import { UserRepository } from "orm/repositories";
import { JwtPayload } from "types/JwtPayload";
import { createJwtToken } from "utils/createJwtToken";

export const login = async (req: Request, res: Response, _next: NextFunction) => {
  const rbody: ServerAPI['LoginPayload'] = req.body;
  
  try {
    const user = await UserRepository.findOne({ where: { email: rbody.email } });
  
    if (user) {
      const jwtPayload: JwtPayload = {
        id: user.id,
        email: user.email,
      };
      const token = createJwtToken(jwtPayload);
      
      res.status(200).send({ jwt: token, user });
    }
  } catch (e) {
    res.status(500).end();
  }
};
