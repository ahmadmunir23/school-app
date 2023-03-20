const Guru = require('../models/guruModel');
const Post = require('../models/postModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllGuru = factory.getAll(Guru);

exports.getOneGuru = factory.getOne(Guru);

exports.createGuru = factory.createOne(Guru);

exports.deleteOneGuru = factory.deleteOne(Guru);

exports.updateOneGuru = factory.updateOne(Guru);

exports.postCreate = catchAsync(async (req, res, next) => {
  const post = await Post.create(req.body);
  res.status(200).json({
    status: 'Succes',
  });
});

exports.patchPost = catchAsync(async (req, res, next) => {
  const post = await Post.findOneAndUpdate(
    {
      judul: req.params.judul.split('-').join(' '),
    },
    req.body
  );
  res.status(201).json({
    status: 'Succes',
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  await Post.findOneAndDelete({
    judul: req.params.judul.split('-').join(' '),
  });
  res.status(200).json({
    status: 'Succes',
  });
});
