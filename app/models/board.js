import mongoose from 'mongoose';

const boardSchema = mongoose.Schema({
  postId: {type: Number},
  name: {type: String, default: 'Доска для общения'},
  code: {
    type: String, maxLength: 8, 
    required: 'Не указан код доски',
    unique: 'Доска с таким кодом уже существует'
  }
});

export default mongoose.model('board', boardSchema);
