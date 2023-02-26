//CHECK PASSWORD
const validator = require('../helper/validate');

// BOOK
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

//USER
const saveUser = (req, res, next) => {
  //must have info - rules
  const validationRule2 = {
    username: 'required|string',
    password: 'required|string' 
  };
//validation
  validator(req.body, validationRule2, {}, (err, status) => {
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
  saveBook, saveUser
};