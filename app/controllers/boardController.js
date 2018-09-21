import Board from '../models/board';

export default {
  async createBoard(ctx) {
    const { name, code } = ctx.request.body;
    const board = new Board({
      name,
      code,
      postId: 1,
      threads: []
    });
    await board.save();
    ctx.body = { board };
  },

  async viewBoards(ctx) {
    const boards = await Board.find({});
    ctx.body = { boards };
  },

  async viewThreads(ctx) {
    const { board } = ctx.request.query;
    const threads = await Post.find({boardCode: board, OP: true}).sort({updatedAt: -1});
    ctx.body = { threads };
  }
}
