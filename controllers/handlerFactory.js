const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
// const Guru = require('../models/guruModel');

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const query = Object.fromEntries(
      Object.entries(req.query).filter(([key, value]) => value !== '')
    );
    const allData = await Model.find(query);
    res.status(200).json({
      status: 'Succes',
      result: allData.length,
      data: {
        data: allData,
      },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({
      nama: req.params.nama.split('-').join(' '),
    });
    if (!doc) return next(new AppError('Maaf data tidak ditemukan', 404));
    res.status(200).json({
      status: 'Succes',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.originalUrl.includes('guru')) {
      if (req.body.password !== req.body.passwordConfirm)
        return next(
          new AppError('password dan password konfirmasi tidak sama', 400)
        );
      const newUser = new Model(req.body);
      await newUser.save();
      res.status(201).json({
        status: 'Succes',
        data: {
          newUser,
        },
      });
    }
    const newUser = new Model(req.body);
    await newUser.save();
    res.status(201).json({
      status: 'Succes',
      data: {
        newUser,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const nama = req.params.nama.split('-').join(' ');
    if (req.originalUrl.includes('guru')) {
      const doc = await Model.findOneAndUpdate({ nama }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return next(new AppError('Maaf data tidak ditemukan', 404));
      return res.status(200).json({
        status: 'Succes',
      });
    }
    // Jika Nilai Form Kosong
    if (!Object.keys(req.body).length) {
      if (!doc.waliKelas._id.equals(req.user._id))
        return next(
          new AppError('Hanya walikelas dan admin yang bisa mengubah data', 401)
        );
      doc.nilai = [];
      await doc.save();
      return res.status(200).json({
        status: 'Succes',
        data: {
          newUser,
        },
      });
    }
    // const doc2 = await Model.findOne({ nama });
    // if (!doc2.waliKelas._id.equals(req.user._id))
    //   return next(
    //     new AppError('Hanya walikelas dan admin yang bisa mengubah data', 401)
    //   );
    const doc = await Model.findOneAndUpdate({ nama }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) return next(new AppError('Maaf data tidak ditemukan', 404));
    if (req.body.nilai) {
      return res
        .status(200)
        .redirect(`/siswa/${doc.nama.split(' ').join('-')}`);
    }
    res.status(200).json({
      status: 'Succes',
    });
    // res.status(200).redirect(`/siswa/${doc.nama.split(' ').join(' ')}`);
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndDelete({
      nama: req.params.nama.split('-').join(' '),
    });
    if (!doc) return next(new AppError('Maaf data tidak ditemukan', 404));
    if (doc.role === 'admin' || doc.role === 'guru')
      return res.status(204).redirect(`/guru`);
    if (doc.role === 'siswa') return res.status(204).redirect(`/data`);
  });

// exports.updateOneSiswaNilai = (Model) =>
//   catchAsync(async (req, res, next) => {
//     const nama = req.params.nama.split('-').join(' ');
//     if (!Object.keys(req.body).length) {
//       const doc = await Model.findOne({ nama });
//       if (!doc) return next(new AppError('Maaf data tidak ditemukan', 404));
//       doc.nilai = [];
//       await doc.save();
//       return res
//         .status(200)
//         .redirect(`/siswa/${doc.nama.split(' ').join(' ')}`);
//     }
//     const doc = await Model.findOneAndUpdate({ nama }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!doc) return next(new AppError('Maaf data tidak ditemukan', 404));
//     res.status(200).redirect(`/siswa/${doc.nama.split(' ').join(' ')}`);
//   });
