const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res, next) => {
    Review
      .create(req.body)
      .then(review => res.send(review))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Review
      .find()
      .lean()
      .limit(100)
      .select('rating review')
      .populate({
        path: 'film',
        select: 'title'
      })
      .then(listOfReviews => res.send(listOfReviews))
      .catch(next);
  });
