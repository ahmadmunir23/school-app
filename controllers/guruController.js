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
  console.log(req.body);
  const post = await Post.create(req.body);
  console.log(post);
  res.status(200).json({
    status: 'Succes',
  });
});

exports.patchPost = catchAsync(async (req, res, next) => {
  console.log(req.params.judul.split('-').join(' '));
  const post = await Post.findOneAndUpdate(
    {
      judul: req.params.judul.split('-').join(' '),
    },
    req.body
  );
  console.log(req.body);
  console.log(post);
  res.status(201).json({
    status: 'Succes',
  });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  console.log(req.params.judul.split('-').join(' '));
  await Post.findOneAndDelete({
    judul: req.params.judul.split('-').join(' '),
  });
  res.status(200).json({
    status: 'Succes',
  });
});
