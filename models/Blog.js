const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    maxLength: 256,
    required: true,
  },
  body: {
    type: String,
    maxLength: 500,
    required: true,
   
  },
  photo:{String},
  auther: {
    type: String,
    ref: 'User',
   
  },
  
  tags: [{tag:String}],

 
});

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;
