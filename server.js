const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(
    'mongodb+srv://smkn4palangkaraya:smkn4palangkaraya@cluster0.me4aiad.mongodb.net/smkn4palangkaraya?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => console.log('connected to database'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`listening on port ${port}`));
