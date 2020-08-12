const mongoose = require('mongoose')
let todoSchema = mongoose.Schema({
  name: String,
  description: String,
  status: String,
  dateline: Date
})

todoSchema.methods.done = function () {
  if (this.status === 'done') {
    return true;
  }
  return false;
}
let ToDo = mongoose.model('ToDo', todoSchema);

module.exports = ToDo;
