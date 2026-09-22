import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    "SECRET_KEY",
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, "SECRET_KEY");
};
