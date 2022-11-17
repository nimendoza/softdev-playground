import validator from "validator";
import { Request, Response, NextFunction } from "express";

import { ServerAPI } from "types/openapi";
import { UserRepository } from "orm/repositories";

export const loginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const rbody: ServerAPI['LoginPayload'] = req.body;
  const err: ServerAPI['LoginError'] = {};

  rbody.email = rbody.email ? rbody.email : '';
  rbody.password = rbody.password ? rbody.password : '';

  if (validator.isEmpty(rbody.email)) {
    err.email = 'This field is required';
  }

  if (validator.isEmpty(rbody.password)) {
    err.password = 'This field is required';
  }

  if (Object.keys(err).length) {
    res.status(400).json(err);
    return;
  }

  try {
    const user = await UserRepository.findOne({ where: { email: rbody.email } });
  
    if (!user) {
      err.email = 'User not found';
    } else if (!user.matchesPassword(rbody.password)) {
      err.password = 'Password is incorrect';
    }

    if (Object.keys(err).length) {
      res.status(400).json(err);
    } else {
      return next();
    }
  } catch (e) {
    res.status(500).end();
  }
};