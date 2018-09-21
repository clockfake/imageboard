import Post from '../models/post';
import Board from '../models/board';

export default {
  async viewPosts(ctx) {
    const { threadId } = ctx.params;
    const posts = await Post.find({threadId});
    ctx.body = { posts };
  },

  async createPost(ctx) {
    const { author, text, threadId, boardCode, OP } = ctx.request.body;
    const { postId } = await Board.findOneAndUpdate({code: boardCode}, {$inc: {postId: 1}});
    const post = new Post({
      author,
      text,
      threadId: threadId || postId,
      postId,
      OP
    });
    await post.save();
    ctx.body = { post };
  }
}
