const Joi = require("joi");

const pictureValidation = (req, res, next) => {
  const picture = req.body;
  const isPost = req.method === "POST";

  const validationErrors = (data, forCreation) => {
    const presence = forCreation ? "required" : "optional";

    const schema = Joi.object({
      name: Joi.string().required().presence(presence),
      url: Joi.string().uri().required().presence(presence),
      productId: Joi.number().required().presence(presence),
    });

    return schema.validate(data).error;
  };

  const error = validationErrors(picture, isPost);

  if (error) {
    res.status(422).json({ message: error["details"][0]["message"] });
  } else {
    next();
  }
};

module.exports = pictureValidation;
