import jwt from "jsonwebtoken";

const secret = "test";

const auth = async (req, res, next) => {
  // 用户登录后，可以做所有操作，所以在进行某些操作前，须先通过此中间件进行token验证，比如发表评论前
  try {
    const token = req.headers.Authorization.split(" ")[1];
    const isCustomAuth = token.length < 500; // if not, it's google token

    let decodeData;

    if (token && isCustomAuth) {
      // 注册的 user
      decodeData = jwt.verify(token, secret);
      req.userId = decodeData?.id;
    } else {
      // google user
      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub; // google的唯一身份标识
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
