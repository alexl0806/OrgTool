import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader === undefined) {
      res.status(400).send({ message: "No Token Given" });
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    try {
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, "test");
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
    } catch (error) {
      res.status(401).send({ message: "Token Expired" });
    }

    next();
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export default auth;
