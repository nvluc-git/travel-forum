import * as services from "../services";
import { response } from "../config/common";
import { signIn, signUp } from "../helper/joi_schema";

export const register = async (req, res) => {
  try {
    const { error } = signUp.validate(req.body);
    if (error) return res.json(response(error.details[0].message, false));
    const data = await services.register(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const resp = await services.verifyEmail(token);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const login = async (req, res) => {
  try {
    const { error } = signIn.validate(req.body);
    if (error) return res.json(response(error.details[0].message, false));
    const data = await services.login(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const sendEmail = async (req, res) => {
  try {
    const resp = await services.sendEmail(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};

export const checkForgot = async (req, res) => {
  try {
    const { token } = req.params;
    const resp = await services.checkForgot(token);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
export const resetPass = async (req, res) => {
  try {
    const resp = await services.resetPass(req.body);
    return res.status(200).json(resp);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Internal server error ");
  }
};
