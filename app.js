require('dotenv').config();
const path = require('path');

const viewRoutes = require('./routes/viewRoutes');
const guruRoutes = require('./routes/guruRoutes');
const siswaRoutes = require('./routes/siswaRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const engine = require('ejs-mate');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const sanitizeHtml = require('sanitize-html');
const helmet = require('helmet');
const multer = require('multer');
const upload = multer();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);

app.use(express.static(path.join(__dirname, 'public')));

app.use(upload.none());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(mongoSanitize());
app.use((req, res, next) => {
  sanitizeHtml(req.body);
  next();
});
app.use('/', viewRoutes);
app.use('/api/v1/siswa', siswaRoutes);
app.use('/api/v1/guru', guruRoutes);

// ERROR HANDLER
app.all('*', (req, res, next) => {
  next(new AppError(`Url ${req.originalUrl} tidak ditemukan!`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
