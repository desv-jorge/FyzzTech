import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  video: { type: String, required: true },
  img: { type: String, required: true }, 
  desc: { type: String, required: true },
  author: { type: String, required: true },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
