import Joi from "joi";

export const signIn = Joi.object({
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "vn"] } }),
  password: Joi.string().required().min(6).max(12),
});
export const signUp = Joi.object({
  username: Joi.string().required().min(5).max(15),
  email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "vn"] } }),

  password: Joi.string().required().min(6).max(12),
});

export const changePassword = Joi.object({
  curPass: Joi.string().required().min(6),
  newPass: Joi.string().required().min(6).max(12),
});

export const updateAccount = Joi.object({
  username: Joi.string().required().min(5).max(10),
  firstname: Joi.string().required().min(5).max(10),
  lastname: Joi.string().required().min(5).max(10),
  birthday: Joi.string().required(),
  gender: Joi.string().required(),
  phonenumber: Joi.string().required(),
  address: Joi.string().required().min(5),
  avatar: Joi.string(),
});

export const newArticle = Joi.object({
  title: Joi.string().required().min(15).max(50),
  subTitle: Joi.string().required().min(15),
  content: Joi.string().required().min(15),
  typeId: Joi.number().required(),
  categoryId: Joi.number().required(),
  image: Joi.string().required(),
});
export const newService = Joi.object({
  title: Joi.string().required().min(5).max(10),
  linkTo: Joi.string().required().min(5),
  image: Joi.string().required(),
});
export const checkUpdateService = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required().min(5).max(10),
  linkTo: Joi.string().required().min(5),
  image: Joi.string(),
});

export const sendMess = Joi.object({
  content: Joi.string().required().min(5),
  image: Joi.string(),
});
