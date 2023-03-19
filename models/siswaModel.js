const mongoose = require('mongoose');
const _ = require('lodash');

const siswaSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Harap masukkan nama'],
    trim: true,
    maxlength: [26, 'Nama harus kurang atau sama dengan 26 karakter'],
    minlength: [3, 'Nama harus lebih atau sama dengan 3 karakter'],
  },
  umur: {
    type: Number,
    required: [true, 'Umur harus ada'],
  },
  alamat: {
    type: String,
    required: true,
  },
  nik: {
    type: Number,
    unique: [true, 'Nik telah digunakan'],
    minlength: [16, 'Nomor NIK harus 16 digit'],
    maxlength: [16, 'Nomor NIK harus 16 digit'],
  },
  ttl: {
    type: String,
    requried: [true, 'Masukkan tempat dan tanggal lahir'],
  },
  kelas: {
    type: String,
    required: [true, 'Masukkan kelas'],
  },
  waliKelas: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guru',
  },
  angkatan: {
    type: Number,
    required: [true, 'Angkatan siswa diperlukan'],
  },
  nomorPonsel: {
    type: String,
  },
  nomorPonselOrangtua: {
    type: String,
  },
  foto: String,
  role: {
    type: String,
    default: 'siswa',
    required: true,
  },
  isNew: {
    type: Boolean,
    default: true,
  },
  aktif: {
    type: Boolean,
    default: true,
  },
  nilai: [
    {
      waktu: {
        type: String,
        required: true,
      },
      ips: {
        type: Number,
        required: true,
      },
      ipa: {
        type: Number,
        required: true,
      },
      bahasaIndonesia: {
        type: Number,
        required: true,
      },
      sejarah: {
        type: Number,
        required: true,
      },
      matematika: {
        type: Number,
        required: true,
      },
      pkn: {
        type: Number,
        required: true,
      },
      penjaskes: {
        type: Number,
        required: true,
      },
    },
  ],
});

siswaSchema.pre('save', async function (next) {
  console.log(this);
  if (!this.isNew) return next();
  let name = this.nama.split(' ');
  for (i = 0; i < name.length; i++) {
    name[i] = name[i][0].toUpperCase() + name[i].substring(1).toLowerCase();
  }
  name = name.join(' ');
  this.nama = name;
  this.isNew = undefined;
  next();
});

// siswaSchema.pre('findOneAndUpdate', async function (next) {
//   console.log('asdasd');
// });

const Siswa = mongoose.model('Siswa', siswaSchema);
module.exports = Siswa;

// const data = [
//   {
//     nama: 'Ahmad Misbahul Munir',
//     umur: 19,
//     alamat: 'Jl. Putri Junjung Buih 6',
//     nohp: 0812313121,
//     ttl: 'July 2003 Palangkaraya',
//     nik: '214212312',
//     foto: 'https://unsplash.com/Ahmad-Misbahul-Munir',
//     nilai: 'ObjectId1231231',
//     nilai: [
//       {
//         waktu: 'X Semester 1',
//         bahasaIndonesia: 80,
//         matematika: 70,
//         sejarah: 70,
//         ipa: 70,
//         ips: 70,
//       },
//       {
//         waktu: 'X Semester 2',
//         bahasaIndonesia: 80,
//         matematika: 70,
//         sejarah: 70,
//         ipa: 70,
//         ips: 70,
//       },
//       {
//         waktu: 'XI Semester 1',
//         bahasaIndonesia: 80,
//         matematika: 70,
//         sejarah: 70,
//         ipa: 70,
//         ips: 70,
//       },
//     ],
//   },
// ];

// console.log(JSON.stringify(data));
