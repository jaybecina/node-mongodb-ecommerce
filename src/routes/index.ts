import express from 'express';

import users from './users';

const router = express.Router();

export default (): express.Router => {
  router.use('/users', users);

  return router;
};