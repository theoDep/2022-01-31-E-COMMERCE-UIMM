const Joi = require("joi");

const userValidation = (req, res, next) => {
  const user = req.body;
  const isPost = req.method === "POST";

  const validationErrors = (data, forCreation) => {
    const presence = forCreation ? "required" : "optional";
    console.log(presence);

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(
          new RegExp(
            "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
          )
        )
        .required()
        .presence(presence),
      lastname: Joi.string().required().presence(presence),
      firstname: Joi.string().required().presence(presence),
      alias: Joi.string().alphanum().min(3).required().presence(presence),
    });

    return schema.validate(data).error;
  };

  const error = validationErrors(user, isPost);

  if (error) {
    res.status(422).json({ message: error["details"][0]["message"] });
  } else {
    next();
  }
};

module.exports = userValidation;
