// CHECK ID -> username
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // getSingle


// GET request returns ALL users
const getAll = async (req, res) => {
  // try and catch to avoid site to crash
  try{
  const result = await mongodb.getDb().db().collection('user').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists); // no index [0] because will show all)
  });
} catch (err){
  res.status(500).json({message: err.message});
}
};

// GET request returns a SINGLE user
const getSingle = async (req, res) => {
  // validate id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid username id.');
  }
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('user').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists[0]);// only shows one
  });
} catch (err){
  res.status(500).json({message: err.message});
}
};

// POST - creates new user
const createUser = async (req, res) => {
  try{
  const userInfo = {
    username: req.body.username,
    password: req.body.password
  };
  const result = await mongodb.getDb().db().collection('user').insertOne(userInfo);
  // Validate request
  if (result.acknowledged) {
    // 201 - This code indicates that a request was successful 
    // and as a result, a resource has been created
    res.status(201).json(result);
  }
} catch (err){
  res.status(500).json({message: err.message} || 'An error occurred.');
}
};

// PUT - updates an user
const updateUser = async (req, res) => {
  // validate id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid username id.');
  }
  try{
  const userId = new ObjectId(req.params.id);
  const userInfo = {
    username: req.body.username,
    password: req.body.password
  };
  // updateOne() is used to update a single entry matching a given specified filter
  const result = await mongodb.getDb().db().collection('user').replaceOne({ _id: userId }, userInfo);
  // modifiedCount - return field that checks for modifications
  if (result.modifiedCount > 0) {
    // 204 - There is no content to send for this request
    res.status(204).send();
  }
} catch (err){
  res.status(500).json({message: err.message} || 'An error occurred.');
}
};

// DELETE - delete an user
const deleteUser = async (req, res) => {
  // validate id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid username id.');
  }
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('user').deleteOne({ _id: userId }, true);
  // deleteCount - return field that checks for deleted data
  if (result.deletedCount > 0) {
    // 200 - The request succeeded. The result meaning of "success" depends on the HTTP method
    res.status(200).send();
  }
} catch (err){
  res.status(500).json({message: err.message} || 'An error occurred.');
}
};


module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };