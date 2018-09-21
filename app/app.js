import koa from 'koa';
import err from './middleware/error';
import mongoose from 'mongoose';
import logger from 'koa-logger';
import cors from 'koa-cors';
import server from 'koa-static';
import router from './routes';

mongoose.set('debug', true);
mongoose.connect(`mongodb+srv://node-admin:${process.env.MONGO_ATLAS_PW}@cluster0-vxcbd.gcp.mongodb.net/test?retryWrites=true`,
{
  useNewUrlParser: true
});
mongoose.connection.on('error', console.error);

const app = new koa();
app.use(serve(path.resolve(__dirname, '../build/')))
    .use(serve(path.resolve(__dirname, '../public/')))
    .use(logger())
    .use(koaBody({ multipart: true }))
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
    console.log('%s listening at port %d', config.app.name, process.env.PORT || 3000);
});
