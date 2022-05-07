const Tour = require('../../models/tourModel');

exports.filter = (queryObj, query) => {
  const queryObjCopy = { ...queryObj };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach(el => delete queryObjCopy[el]);

  let queryStr = JSON.stringify(queryObjCopy);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
  return query.find(JSON.parse(queryStr));
};

exports.sort = (query, queryStr) => {
  if (queryStr) {
    const sortBy = queryStr.split(',').join(' ');
    return query.sort(sortBy);
  }
  return query.sort('-createdAt');
};

exports.limit = (query, queryStr) => {
  if (queryStr) {
    const fields = queryStr.split(',').join(' ');
    return query.select(fields);
  }
  return query.select('-__v');
};

exports.paginate = async (query, queryPage, queryLimit) => {
  const page = +queryPage || 1;
  const limit = +queryLimit || 100;
  const skip = (page - 1) * limit;
  const retQuery = query.skip(skip).limit(limit);

  if (queryPage) {
    const numTours = await Tour.countDocuments();
    if (skip >= numTours) {
      throw new Error('This page does not exist');
    }
  }

  return retQuery;
};
