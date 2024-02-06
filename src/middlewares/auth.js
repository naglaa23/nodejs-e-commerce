import jwt from "jsonwebtoken";
import userModel from "../../db/models/user.model.js";

export const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.json({ message: "Invalid authorization" });
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWTSECRET, async (err, decode) => {
    if (err) {
      return res.json({ message: "invalid token" });
    } else {
      const user = await userModel.findById(decode.id);
      if (user) {
        req.userId = decode.id;
        req.userRole = user.role;
        next();
      } else {
        return res.json({ message: "unauthorized" });
      }
    }
  });
};


export const adminAuth = async (req, res, next) => {
  auth(req, res, () => {
    if (req.userRole === "admin") {
      next();
    } else {
      return res.json({ message: "this is admin authority only" });
    }
  });
};
