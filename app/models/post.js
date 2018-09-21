import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  date: {type: String, default: () => (new Date()).toISOString() },
  author: {type: String, default: 'Аноним'},
  text: {type: String, maxLength: [15000, 'Максимальная длина поста - 15000 символов']},
  postId: {type: Number},
  boardCode: { type: String, required: true},
  threadId: {type: Number, required: true},
  OP: { type: String, default: false }
}, { timestamps: true });

export default mongoose.model('post', postSchema);
