const catchAsync = require('../shared/errors/catchAsyncErrors');
const AppError = require('../shared/errors/appError');
const queryHelpers = require('../shared/helpers/queryHelpers');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const document = await query;
    if (!document) {
      return next(new AppError('No tour found with that ID', 404));
    }

    return res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    // To allow nested GET reviews on tour (workaround)
    const filter = {};
    if (req.params.tourId) {
      filter.tour = req.params.tourId;
    }

    let query = queryHelpers.filter(req.query, Model.find(filter));
    query = queryHelpers.sort(query, req.query.sort);
    query = queryHelpers.limit(query, req.query.fields);
    query = queryHelpers.paginate(query, req.query.page, req.query.limit);

    const document = await query;

    return res.status(200).json({
      status: 'success',
      results: document.length,
      data: {
        data: document,
      },
    });
  });
