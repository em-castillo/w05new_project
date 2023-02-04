const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // getSingle

// GET request returns ALL documents in children collection
const getAll = async (req, res) => {
  // try and catch to avoid site to crash
  try{
  const result = await mongodb.getDb().db().collection('children').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists); // no index [0] because will show all)
  });
} catch (err){
  res.status(500).json({message: err.message});
}
};

// GET request returns a SINGLE document in children collection
// where an ID matches the ID from a query parameter.
const getSingle = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('children').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    // 200 - every has gone according to plan
    res.status(200).json(lists[0]);// only shows one
  });
} catch (err){
  res.status(500).json({message: err.message});
}
};

// POST - creates new children book
const createBook = async (req, res) => {
  try{
  const childrenBook = {
    title: req.body.title,
    year: req.body.year,
    author: req.body.author,
    illustrator: req.body.illustrator,
    category: req.body.category,
    description: req.body.description,
    awards: req.body.awards
  };
  const result = await mongodb.getDb().db().collection('children').insertOne(childrenBook);
  // Validate request
  if (result.acknowledged) {
    // 201 - This code indicates that a request was successful 
    // and as a result, a resource has been created
    res.status(201).json(result);
  }
} catch (err){
  res.status(500).json({message: err.message});
}
};

// PUT - updates a children book
const updateBook = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const childrenBook = {
    title: req.body.title,
    year: req.body.year,
    author: req.body.author,
    illustrator: req.body.illustrator,
    category: req.body.category,
    description: req.body.description,
    awards: req.body.awards
  };
  // updateOne() is used to update a single entry matching a given specified filter
  const result = await mongodb.getDb().db().collection('children').replaceOne({ _id: userId }, childrenBook);
  // modifiedCount - return field that checks for modifications
  if (result.modifiedCount > 0) {
    // 204 - There is no content to send for this request
    res.status(204).send();
  }
} catch (err){
  res.status(500).json({message: err.message});
}
};

// DELETE - delete a children book
const deleteBook = async (req, res) => {
  try{
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('children').deleteOne({ _id: userId }, true);
  // deleteCount - return field that checks for deleted data
  if (result.deleteCount > 0) {
    // 200 - The request succeeded. The result meaning of "success" depends on the HTTP method
    res.status(200).send();
  }
} catch (err){
  res.status(500).json({message: err.message});
}
};


module.exports = { getAll, getSingle, createBook, updateBook, deleteBook };