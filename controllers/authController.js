const crypto = require('crypto');
const Guru = require('../models/guruModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const cookieOptions = {
  expires: new Date(
    Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  ),
  httpOnly: true,
  sameSite: 'none',
  secure: false,
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETCODE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  console.log('createSendToken');
  res.status(statusCode).json({
    status: 'Succes',
  });
};

function verifyTokenJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRETCODE, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError('Masukkan email dan Password', 400));
  const user = await Guru.findOne({ email }).select('+password');
  console.log('hi');
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Password atau email salah', 401));
  createSendToken(user, 200, res);
});

exports.logOut = (req, res) => {
  res.cookie('jwt', 'logout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).redirect('/');
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies.jwt) token = req.cookies.jwt;
  if (!token) return next(new AppError('login untuk mendapatkan akses', 401));
  const decoded = await verifyTokenJWT(token);
  const currentUser = await Guru.findById(decoded.id);
  if (!currentUser)
    return next(new AppError('Pengguna ini tidak ada lagi, mohon login', 401));

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await verifyTokenJWT(req.cookies.jwt);
      const currentUser = await Guru.findById(decoded.id);
      if (!currentUser) return next();
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      res.locals.user = null;
      return next();
    }
  }

  res.locals.user = null;
  next();
};

exports.restrtictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError(
          'Maaf anda tidak memiliki izin untuk melakukan aksi ini',
          403
        )
      );
    next();
  };

exports.restrictToEdit = catchAsync(async (req, res, next) => {});
