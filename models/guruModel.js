const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const guruSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Harap masukkan nama'],
    trim: true,
    maxlength: [26, 'Nama harus kurang atau sama dengan 26 karakter'],
    minlength: [3, 'Nama harus lebih atau sama dengan 3 karakter'],
  },
  umur: {
    type: Number,
    required: [true, 'Umur diperlukan'],
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
  isNew: {
    type: Boolean,
    default: true,
  },
  foto: String,
  aktif: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'guru'],
      message: `Masukkan "admin", atau "guru"`,
    },
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Masukkan email'],
    validate: [validator.isEmail],
  },
  nomorPonsel: String,
  password: {
    type: String,
    required: [true, 'Masukkan Password'],
    minlength: [8, 'Password minimal 8 karakter'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      // This only works on save
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same!',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

guruSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  console.log('pre');
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;

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

guruSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// guruSchema.methods.createResetToken = function () {
//   const resetToken = crypto.randomBytes(24).toString('hex');
//   this.passwordResetToken = crypto
//     .createHash('sha256')
//     .update(resetToken)
//     .digest('hex');
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };
// guruSchema.post('save', function (next) {
//   console.log('After safe');
// });

const Guru = mongoose.model('Guru', guruSchema);
module.exports = Guru;
