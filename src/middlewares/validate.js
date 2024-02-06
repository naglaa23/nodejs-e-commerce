export const validate = (schema) => {
    return (req, res, next) => {
      let checkValidation = schema.validate(req.body, { abortEarly: false });
      if (checkValidation && checkValidation.error) {
        res.json({
          message: "error",
          err: checkValidation.error.details,
        });
      } else {
        next();
      }
    };
  };