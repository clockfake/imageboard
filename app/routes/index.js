import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import initApi from './api';

const router = new Router();

initApi(router);

router.get('*', async function(ctx, next) {
  var html = fs.readFileSync(path.resolve('./build/index.html'));
  ctx.type = 'html';
  ctx.body = html;
});

export default router
