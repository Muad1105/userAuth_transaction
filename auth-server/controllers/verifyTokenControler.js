import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  console.log("verify token controller", cookie);
  const userId = cookie.split("=")[0];
  const token = cookie.split("=")[1];
  console.log(
    "recieved token\n",
    cookie,
    "ussssssser IIIIIId",
    userId,
    "Toooooooken",
    token
  );
  if (!token) {
    console.error("cookies not found.");
    res.status(404).json({ message: "No token found" });
  }

  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.error("err", err);
      return res.status(400).json({ message: "Invalid Token" });
    }
    console.log(user.id);
    req.id = user.id;
    next();
  });
};

export default verifyToken;
