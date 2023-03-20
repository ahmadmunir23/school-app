const Guru = require('../models/guruModel');
const Siswa = require('../models/siswaModel');
const Post = require('../models/postModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getHome = catchAsync(async (req, res) => {
  const berita = await Post.find({ type: 'berita' })
    .sort({ createdAt: -1 })
    .limit(4)
    .populate('author');
  const pengumuman = await Post.find({ type: 'pengumuman' })
    .sort({ createdAt: -1 })
    .limit(4)
    .populate('author');
  const headline = await Post.find({ headline: 'true' })
    .limit(4)
    .sort({ createdAt: -1 });
  res.status(200).render('homepage', { berita, pengumuman, headline });
});
exports.getLoginPage = (req, res) => {
  res.status(200).render('login');
};

exports.getCreateSiswaPage = async (req, res) => {
  const allGuru = await Guru.find();

  res.status(200).render('registerSiswaPage', { allGuru });
};
exports.getCreateGuruPage = (req, res) => {
  res.status(200).render('registerGuruPage');
};
exports.getOneGuruPage = catchAsync(async (req, res, next) => {
  const guru = await Guru.findOne({
    nama: req.params.nama.split('-').join(' '),
  });
  if (!guru) return next(new AppError('Data guru tidak ditemukan', 404));
  res.status(200).render('guruDetailPage', { guru });
});
exports.getOneSiswaPage = catchAsync(async (req, res, next) => {
  const allGuru = await Guru.find();
  const siswa = await Siswa.findOne({
    nama: req.params.nama.split('-').join(' '),
  }).populate('waliKelas');
  if (!siswa) return next(new AppError('Data siswa tidak ditemukan', 404));
  res.status(200).render('siswaDetailPage', {
    siswa,
    allGuru,
  });
});
exports.getGuruPage = catchAsync(async (req, res, next) => {
  const allGuru = await Guru.find().select(
    ' -alamat -aktif -role -email -ttl '
  );
  if (!allGuru) return next(new AppError('Data tidak ditemukan', 404));
  res.status(200).render('guruPage', { allGuru });
});
exports.getDataPage = catchAsync(async (req, res, next) => {
  res.status(200).render('dataPage');
});
exports.getSearch = catchAsync(async (req, res, next) => {
  const data = await Siswa.findOne({ nik: req.body.search });
  if (!data) return next(new AppError('Data tidak ditemukan', 404));
  res.status(200).json({
    status: 'Success',
    data: {
      data,
    },
  });
});
exports.getCreatePostPage = catchAsync(async (req, res) => {
  res.status(200).render('postNews');
});
exports.getAllPostPage = catchAsync(async (req, res) => {
  const berita = await Post.find({ type: 'berita' })
    .sort({ createdAt: -1 })
    .populate('author');
  const pengumuman = await Post.find({ type: 'pengumuman' })
    .sort({ createdAt: -1 })
    .populate('author');
  res.status(200).render('postPage', { berita, pengumuman });
  // const post = await Post.find().sort({ createdAt: -1 });
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     post,
  //   },
  // });
});
exports.getOnePostPage = catchAsync(async (req, res) => {
  const post = await Post.findOne({
    judul: req.params.judul.split('-').join(' '),
  }).populate('author');
  res.status(200).render('postOnePage', { post });
});
