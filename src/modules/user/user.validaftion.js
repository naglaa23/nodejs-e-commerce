import Joi from "joi";
//-------------------------addUserSchema------------------------------///

export const addUserSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  address: Joi.array().items(
    Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
    })
  ),
});
//-------------------------loginSchema------------------------------///

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
//-------------------------updateUserSchema------------------------------///
export const updateUserSchema = Joi.object({
  userName: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  address: Joi.array().items(
    Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
    })
  ),
});
