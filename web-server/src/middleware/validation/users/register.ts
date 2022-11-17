import validator from "validator";
import { Request, Response, NextFunction } from "express";

import { ServerAPI } from "types/openapi";
import { UserConstants } from "consts/User";
import { UserRepository } from "orm/repositories";

export const registerValidation = async (req: Request, res: Response, next: NextFunction) => {
  let { email, password, passwordConfirm } = req.body as ServerAPI['RegisterUserPayload'];

  email = email ? email : '';
  password = password ? password : '';
  passwordConfirm = passwordConfirm ? passwordConfirm : '';

  const err: ServerAPI['UserError'] = {};

  if (validator.isEmpty(email)) {
    err.email = 'This field is required';
  } else if (!validator.isEmail(email)) {
    err.email = 'That e-mail address is invalid';
  } else {
    const user = await UserRepository.findOne({ where: { email } });
    if (user) {
      err.email = 'That e-mail address is already registered';
    }
  }

  if (validator.isEmpty(password)) {
    err.password = 'This field is required';
  } else if (!validator.isLength(password, { min: UserConstants.passwordMinChar })) {
    err.password = 'Password is too short';
  }

  if (validator.isEmpty(passwordConfirm)) {
    err.passwordConfirm = 'This field is required';
  }

  if (!validator.isEmpty(password) && !validator.isEmpty(passwordConfirm) && password !== passwordConfirm) {
    err.passwordConfirm = 'Passwords do not match';
  }

  if (Object.keys(err).length) {
    res.status(400).json(err);
  } else {
    return next();
  }
};