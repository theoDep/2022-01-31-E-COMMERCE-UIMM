const argon2 = require("argon2");

const passwordHash = async (req, res, next) => {
  const { password } = req.body;
  if (!password) res.status(400).json({ message: "Password missing" });
  try {
    const hash = await argon2.hash(password);
    req.body.password = hash;
    next();
  } catch (err) {
    console.warn(err);
    res.status(400).json({ message: "Password hashing failed" });
  }
};

const passwordVerify = async (hash, password) => {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    console.warn(err);
    res.status(400).json({ message: "Password verification failed" });
  }
};

module.exports = { passwordHash, passwordVerify };
