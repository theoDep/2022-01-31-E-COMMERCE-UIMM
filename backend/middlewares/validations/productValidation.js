const Joi = require("joi");

const productValidation = (req, res, next) => {
  const product = req.body;
  const isPost = req.method === "POST";

  const validationErrors = (data, forCreation) => {
    const presence = forCreation ? "required" : "optional";

    const picture = Joi.object({
      name: Joi.string().required().presence(presence),
      url: Joi.string().required().presence(presence),
    });

    const schema = Joi.object({
      name: Joi.string().required().presence(presence),
      description: Joi.string().required().presence(presence),
      price: Joi.number().required().presence(presence),
      pictures: Joi.array().items(picture).required().presence(presence),
    });

    return schema.validate(data).error;
  };

  const error = validationErrors(product, isPost);

  if (error) {
    res.status(422).json({ message: error["details"][0]["message"] });
  } else {
    next();
  }
};

module.exports = productValidation;
