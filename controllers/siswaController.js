const Siswa = require('../models/siswaModel');
const factory = require('./handlerFactory');

exports.getAllSiswa = factory.getAll(Siswa);

exports.getOneSiswa = factory.getOne(Siswa);

exports.createSiswa = factory.createOne(Siswa);

exports.deleteOneSiswa = factory.deleteOne(Siswa);

exports.updateOneSiswaData = factory.updateOne(Siswa);

// exports.updateOneSiswaNilai = factory.updateOneSiswaNilai(Siswa);
