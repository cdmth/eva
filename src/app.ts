import * as express from 'express';

import middlewares from './config/middlewares';
import Routes from './modules';
import './config/db';

const app = express();

middlewares(app)

app.use('/api/v1', Routes)

export default app