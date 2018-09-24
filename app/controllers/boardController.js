import Board from '../models/board';
import Post from '../models/post';

export default {
  async createBoard(ctx) {
    console.log(ctx.request);
    const { name, code } = ctx.request.body;
    const board = new Board({
      name,
      code,
      postId: 1,
      threads: []
    });
    await board.save();
    if (!board) ctx.throw(405, { message: 'Не удалось создать доску' });
    ctx.body = { board };
  },

  async viewBoards(ctx) {
    const boards = await Board.find({});
    ctx.body = { boards };
  },

  async viewThreads(ctx) {
    const { board } = ctx.params;
    const boards = await Board.findOne({code: board});
    if (!boards) ctx.throw(500, {message: 'Доска не найдена'});
    const threads = await Post.find({boardCode: board, OP: true}).sort({updatedAt: -1});
    ctx.body = { threads };
  }
}
