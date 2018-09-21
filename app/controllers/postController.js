import Post from '../models/post';
import Board from '../models/board';

export default {
  async viewPosts(ctx) {
    const { threadId } = ctx.params;
    const posts = await Post.find({threadId});
    const {name: boardName} = await Board.findOne({code: posts[0].boardCode})
    ctx.body = { posts, boardName };
  },

  async createPost(ctx) {
    const { author, text, threadId, boardCode, OP } = ctx.request.body;
    const { postId } = await Board.findOneAndUpdate({code: boardCode}, {$inc: {postId: 1}});
    const post = new Post({
      author,
      text,
      threadId: threadId || postId,
      postId,
      boardCode,
      OP
    });
    await post.save();
    ctx.body = { post };
  }
}
