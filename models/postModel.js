const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: [true, 'Mohon isi judul'],
  },
  isi: {
    type: String,
    required: [true, 'Isi diperlukan'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  headline: {
    type: String,
  },
  type: {
    type: String,
    enum: {
      values: ['berita', 'pengumuman'],
      message: `Masukkan "berita", atau "pengumuman"`,
    },
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guru',
  },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
