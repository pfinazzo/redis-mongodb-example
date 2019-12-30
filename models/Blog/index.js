const { Schema, model } = require('mongoose');

const BlogSchema = new Schema({
  uid: {
    type: Schema.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  }
});

module.exports = model('Blog', BlogSchema);