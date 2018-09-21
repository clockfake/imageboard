import koa from 'koa';
import err from './middleware/error';
import mongoose from 'mongoose';
import logger from 'koa-logger';
import cors from 'koa-cors';
import serve from 'koa-static';
import koaBody from 'koa-body';
import router from './routes';
import path from 'path';

mongoose.set('debug', true);
mongoose.connect(`mongodb+srv://node-admin:${process.env.MONGO_ATLAS_PW}@cluster0-vxcbd.gcp.mongodb.net/test?retryWrites=true`,
{
  useNewUrlParser: true
});
mongoose.connection.on('error', console.error);

const corsOptions = {
  origin: '*',
  credentials: true
};

const app = new koa();
app.use(serve(path.resolve(__dirname, '../build/')))
    .use(serve(path.resolve(__dirname, '../public/')))
    .use(logger())
    .use(koaBody({multipart: true}))
    .use(cors(corsOptions))
    .use(err)
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening at port %d', process.env.PORT || 3000);
});
