const validator = require('../helper/validate');

const saveBook = (req, res, next) => {
    //must have info - rules
  const validationRule = {
    title: 'required|string',
    year: 'required|integer',
    author: 'required|string', 
    illustrator: 'string',
    category: 'string',
    description: 'required|string',
    award: 'string'
  };
  //validation
  validator(req.body, validationRule, {}, (err, status) => {
    // if fails
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } 
    // if succeeds
    else {
      next();
    }
  });
};

module.exports = {
  saveBook
};