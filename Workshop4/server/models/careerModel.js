const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const career = new Schema({
  name: { type: String },
  code: { type: String },
  description: { type: String },
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = mongoose.model("Career", career);
