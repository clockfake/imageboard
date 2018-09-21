import boardController from '../controllers/boardController';
import postController from '../controllers/postController';

export default router => {
    router.get('/api/getboards', boardController.viewBoards);
    router.post('/api/createBoard', boardController.createBoard);
    router.get('/api/:board', boardController.viewThreads);

    router.get('/api/post/:threadId', postController.viewPosts);
    router.post('/api/post/createPost', postController.createPost);
}
